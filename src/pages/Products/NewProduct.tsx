import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ProductsService from '../../services/ProductsService';
import { useDispatch } from 'react-redux';
import { createProduct } from './ProductSlice';
import { useHistory } from 'react-router-dom';

type Inputs = {
  name: string;
  description: string;
};

function NewProduct(): JSX.Element {
  const { register, handleSubmit } = useForm<Inputs>();
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
                <label htmlFor="inputAddress2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register('name')}
                  name="name"
                  required
                  style={{ height: '56px' }}
                />
                <label>Descripton</label>
                <textarea
                  className="form-control"
                  rows={5}
                  cols={60}
                  {...register('description')}
                  name="description"
                ></textarea>
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
