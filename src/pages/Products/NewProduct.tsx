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
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputAddress2">Name</label>
                  <input
                    type="text"
                    className="form-control"
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
                    name="description"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
