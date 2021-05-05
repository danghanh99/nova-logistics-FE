import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Supplier from '../../services/api/types/Supplier';
import SuppliersService from '../../services/api/supplierApiClient';
import { reset, newSupplier } from '../../services/state/SuppliersSlice';
import * as yup from 'yup';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';
import IState from '../../../common/services/api/types/StateType';
import { isLoading } from '../../../common/services/state/LoadingSlice';
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
  const loading = useSelector((state: IState) => state.isLoading);
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
    SuppliersService.newSupplier(inputText)
      .then((res) => {
        dispatch(newSupplier(res));
        dispatch(reset(true));
        history.push('/admin/suppliers');
        setTimeout(() => {
          enqueueSnackbar('New supplier success', { variant: 'success' });
        }, 500);
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
                <div className="col-md-12">
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
                <div className="col-md-12">
                  <label>Phone number:</label>
                  <input
                    {...register('phone')}
                    placeholder="phone number..."
                    className="form-control height-56"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone"
                  />
                  <p>{errors.phone?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Address:</label>
                  <input
                    {...register('address')}
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    id="comment"
                    defaultValue={''}
                    autoComplete="on"
                    name="address"
                  />
                  <p>{errors.address?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Description:</label>
                  <textarea
                    {...register('description')}
                    placeholder="description..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    rows={5}
                    id="comment"
                    defaultValue={''}
                    autoComplete="on"
                    name="description"
                  />
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

export default NewSupplier;
