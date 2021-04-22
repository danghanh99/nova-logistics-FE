import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Supplier from '../../models/Supplier';
import SuppliersService from '../../services/SuppliersService';
import { reset } from '../Imports/ImportsSlice';
import { newSupplier } from './SuppliersSlice';
import * as yup from 'yup';
import '../Exports/style.css';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';
const NewSupplier = (): JSX.Element => {
  const schema = yup.object().shape({
    name: yup.string().max(64).required(),
    phone: yup.string().required().matches(/^\d+$/, {
      message: 'Please enter valid number',
      excludeEmptyString: false,
    }),
    address: yup.string().max(256).required(),
    description: yup.string().max(512),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const initial: Supplier = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    description: '',
  };
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
                <div className="col-md-12">
                  <label>Name:</label>
                  <input
                    {...register('name')}
                    placeholder="name..."
                    className="form-control"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="name"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Phone number:</label>
                  <input
                    {...register('phone')}
                    placeholder="phone number..."
                    className="form-control"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.phone?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Address:</label>
                  <input
                    {...register('address')}
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control"
                    id="comment"
                    defaultValue={''}
                    autoComplete="on"
                    name="address"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.address?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Description:</label>
                  <textarea
                    {...register('description')}
                    placeholder="description..."
                    onChange={handleInputChange}
                    className="form-control"
                    rows={5}
                    id="comment"
                    defaultValue={''}
                    autoComplete="on"
                    name="description"
                  />
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
};

export default NewSupplier;
