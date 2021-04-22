import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ProductsService from '../../services/ProductsService';
import { useDispatch } from 'react-redux';
import { createProduct } from './ProductSlice';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import '../Exports/style.css';
import { yupResolver } from '@hookform/resolvers/yup';
type Inputs = {
  name: string;
  description: string;
};

function NewProduct(): JSX.Element {
  const schema = yup.object().shape({
    name: yup.string().max(64).required(),
    description: yup.string().max(512),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data: Inputs) => {
    ProductsService.createProduct(data.name, data.description).then(
      (res) => {
        dispatch(createProduct(res.data.product));
        enqueueSnackbar('Create Product Success', { variant: 'success' });
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
      <div className="container">
        <div className="row">
          <div
            className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col-md-12">
                  <label htmlFor="inputAddress2">Name</label>
                  <input
                    {...register('name')}
                    className="form-control"
                    name="name"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Descripton</label>
                  <textarea
                    {...register('description')}
                    className="form-control"
                    rows={5}
                    cols={60}
                    {...register('description')}
                    name="description"
                  ></textarea>
                  <p>{errors.description?.message}</p>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
