import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ProductsService from '../../services/ProductsService';
import { useDispatch } from 'react-redux';
import { createProduct } from './ProductSlice';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from '../../models/Product';
import ClipLoader from 'react-spinners/ClipLoader';

type Inputs = {
  name: string;
  description: string;
};
type Params = {
  id: string;
};

function EditProduct(): JSX.Element {
  const { id }: Params = useParams();
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    ProductsService.getDetailProduct(parseInt(id, undefined)).then((res) => {
      setProduct(res.data.product);
    });
  });
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data: Inputs) => {
    ProductsService.updateProduct({
      id: parseInt(id, undefined),
      name: data.name,
      description: data.description,
    }).then(
      (res) => {
        dispatch(createProduct(res.data.product));
        enqueueSnackbar('Update Product Success', { variant: 'success' });
        history.push('/admin/products');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        enqueueSnackbar(resMessage, { variant: 'error' });
      }
    );
  };
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {product === undefined ? (
                <ClipLoader color="#FFC0CB" loading={true} size={400} />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputAddress2">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={product?.name}
                        {...register('name')}
                        name="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Descripton</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        cols={60}
                        {...register('description')}
                        value={product?.description}
                        name="description"
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default EditProduct;
