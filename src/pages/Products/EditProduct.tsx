import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ProductsService from '../../services/ProductsService';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './ProductSlice';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from '../../models/Product';
import * as yup from 'yup';
// import '../Exports/style.css';
import { yupResolver } from '@hookform/resolvers/yup';
// import './../Imports/Imports.scss';
import IState from '../../types/StateType';
import Loader from '../../modules/common/components/Loader/Loader';
import { isLoading } from '../../LoadingSlice';
type Inputs = {
  name: string;
  description: string;
};
type Params = {
  id: string;
};

function EditProduct(): JSX.Element {
  const schema = yup.object().shape({
    name: yup.string().max(64),
    description: yup.string().max(512),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { id }: Params = useParams();
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    ProductsService.getDetailProduct(parseInt(id, undefined)).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);
  const loading = useSelector((state: IState) => state.isLoading);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data: Inputs) => {
    ProductsService.updateProduct({
      id: parseInt(id, undefined),
      name: data.name,
      description: data.description,
    })
      .then((res) => {
        dispatch(createProduct(res.product));
        history.push('/admin/products');
        setTimeout(() => {
          enqueueSnackbar('Update Product Success', { variant: 'success' });
        }, 500);
      })
      .catch((error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
        return error;
      });
  };
  const { enqueueSnackbar } = useSnackbar();

  if (!product) {
    return <Loader isLoading={loading} />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 auto-center-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col-md-12">
                  <label htmlFor="inputAddress2">Name</label>
                  <input
                    {...register('name')}
                    className="form-control height-56"
                    defaultValue={product?.name}
                    name="name"
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Descripton</label>
                  <textarea
                    {...register('description')}
                    className="form-control height-56"
                    rows={5}
                    cols={60}
                    {...register('description')}
                    defaultValue={product?.description}
                    name="description"
                  ></textarea>
                  <p>{errors.description?.message}</p>
                </div>
              </div>
              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  &nbsp;{!loading ? 'Save' : 'Loading...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
