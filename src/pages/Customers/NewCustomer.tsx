import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Customer from '../../models/Customer';
import CustomersService from '../../services/CustomersService';
import { reset } from '../Imports/ImportsSlice';
import { newCustomer } from './CustomersSlice';
import * as yup from 'yup';
import '../Exports/style.css';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';
import './../Imports/Imports.scss';
import IState from '../../types/StateType';
import { isLoading } from '../../LoadingSlice';

const NewCustomer = (): JSX.Element => {
  const loading = useSelector((state: IState) => state.isLoading);
  const schema = yup.object().shape({
    name: yup.string().max(64).required(),
    phone_number: yup.string().required().matches(/^\d+$/, {
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

  const initial: Customer = {
    id: 0,
    name: '',
    phone_number: '',
    address: '',
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
    CustomersService.newCustomer(inputText)
      .then((res) => {
        dispatch(newCustomer(res));
        dispatch(reset(true));
        history.push('/admin/customers');
        enqueueSnackbar('New customer success', { variant: 'success' });
      })
      .catch((error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
        return error;
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 auto-center-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col-12">
                  <label>Name:</label>
                  <input
                    {...register('name')}
                    placeholder="name..."
                    className="form-control height-56"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="name"
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="col-12">
                  <label>Phone number:</label>
                  <input
                    {...register('phone_number')}
                    placeholder="phone number..."
                    className="form-control height-56"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone_number"
                  />
                  <p>{errors.phone_number?.message}</p>
                </div>
                <div className="col-12">
                  <label>Address:</label>
                  <textarea
                    {...register('address')}
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    rows={5}
                    id="comment"
                    defaultValue={''}
                    autoComplete="on"
                    name="address"
                  />
                  <p>{errors.address?.message}</p>
                </div>
              </div>

              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn "
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  &nbsp;{!loading ? 'Create' : 'Create...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCustomer;
