import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Supplier from '../../models/Supplier';
import CustomersService from '../../services/CustomersService';
import SuppliersService from '../../services/SuppliersService';
import { reset } from '../Imports/ImportsSlice';
import { newSupplier } from './SuppliersSlice';
const NewSupplier = (): JSX.Element => {
  const initial: Supplier = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    description: '',
  };
  const { handleSubmit } = useForm();
  const [inputText, setInputText] = useState(initial);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = () => {
    SuppliersService.newSupplier(inputText).then(
      (res) => {
        dispatch(newSupplier(res));
        dispatch(reset(true));
        history.push('/admin/suppliers');
        enqueueSnackbar('New supplier success', { variant: 'success' });
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
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="name..."
                  className="form-control"
                  onChange={handleInputChange}
                  autoComplete="on"
                  required
                  name="name"
                />
                <label>Phone number:</label>
                <input
                  type="text"
                  placeholder="phone number..."
                  className="form-control"
                  onChange={handleInputChange}
                  autoComplete="on"
                  required
                  name="phone"
                />
                <label>Address:</label>
                <input
                  placeholder="address..."
                  onChange={handleInputChange}
                  className="form-control"
                  id="comment"
                  defaultValue={''}
                  autoComplete="on"
                  name="address"
                  required
                />
                <label>Description:</label>
                <textarea
                  placeholder="description..."
                  onChange={handleInputChange}
                  className="form-control"
                  rows={5}
                  id="comment"
                  defaultValue={''}
                  autoComplete="on"
                  name="description"
                  required
                />
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
};

export default NewSupplier;
