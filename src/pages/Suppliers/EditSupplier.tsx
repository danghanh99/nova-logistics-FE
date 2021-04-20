import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import Supplier from '../../models/Supplier';
import { useSnackbar } from 'notistack';
import Customer from '../../models/Customer';
import CustomersService from '../../services/CustomersService';

type Params = {
  id: string;
};

export interface IStateSupplier {
  suppliers: Supplier[];
}

const EditSupplier = (): JSX.Element => {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            {customerDetail.id === 0 ? (
              <ClipLoader color="#FFC0CB" loading={true} size={400} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="name..."
                    className="form-control"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="name"
                    defaultValue={customerDetail.name}
                  />
                  <label>Phone number:</label>
                  <input
                    type="text"
                    placeholder="phone number..."
                    className="form-control"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone_number"
                    defaultValue={customerDetail.phone_number}
                  />
                </div>
                <label>Address:</label>
                <textarea
                  placeholder="address..."
                  onChange={handleInputChange}
                  className="form-control"
                  rows={5}
                  id="comment"
                  autoComplete="on"
                  name="address"
                  defaultValue={customerDetail.address}
                />
                <div style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSupplier;
