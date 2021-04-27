import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import Supplier from '../../models/Supplier';
import { useSnackbar } from 'notistack';
import Customer from '../../models/Customer';
import CustomersService from '../../services/CustomersService';
import * as yup from 'yup';
import '../Exports/style.css';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import './../Imports/Imports.scss';
import IState from '../../types/StateType';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
type Params = {
  id: string;
};

export interface IStateSupplier {
  suppliers: Supplier[];
}

const EditCustomer = (): JSX.Element => {
  const loading = useSelector((state: IState) => state.isLoading);
  const schema = yup.object().shape({
    name: yup.string().max(64),
    phone_number: yup.string().matches(/^\d+$/, {
      message: 'Please enter valid number',
      excludeEmptyString: false,
    }),
    address: yup.string().max(256),
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
  const { id }: Params = useParams();

  const [customerDetail, setCustomer] = useState(initial);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const onSubmit = (e: React.FormEvent) => {
    CustomersService.editCustomer(customerDetail).then(
      () => {
        history.push('/admin/customers');
        enqueueSnackbar('Update customer success', { variant: 'success' });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customerDetail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    CustomersService.getCustomer(parseInt(id, undefined)).then((res) => {
      setCustomer(res.data.customer);
    });
  }, []);
  if (customerDetail.id === 0) {
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
                  <label>Name:</label>
                  <input
                    {...register('name')}
                    placeholder="name..."
                    className="form-control height-56"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="name"
                    defaultValue={customerDetail.name}
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Phone number:</label>
                  <input
                    {...register('phone_number')}
                    placeholder="phone number..."
                    className="form-control height-56"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone_number"
                    defaultValue={customerDetail.phone_number}
                  />
                  <p>{errors.phone_number?.message}</p>
                </div>
                <div className="col-md-12">
                  <label>Address:</label>
                  <textarea
                    {...register('address')}
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    rows={5}
                    id="comment"
                    autoComplete="on"
                    name="address"
                    defaultValue={customerDetail.address}
                  />
                  <p>{errors.address?.message}</p>
                </div>
              </div>
              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                >
                  Save
                </button>
              </div>
            </form>
            <Loader isLoading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
