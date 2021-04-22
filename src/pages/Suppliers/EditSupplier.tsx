import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import Supplier from '../../models/Supplier';
import { useSnackbar } from 'notistack';
import Customer from '../../models/Customer';
import CustomersService from '../../services/CustomersService';
import SuppliersService from '../../services/SuppliersService';

type Params = {
  id: string;
};

export interface IStateSupplier {
  suppliers: Supplier[];
}

const EditSupplier = (): JSX.Element => {
  const initial: Supplier = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    description: '',
  };
  const { id }: Params = useParams();

  const [supplierDetail, setSupplier] = useState(initial);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SuppliersService.editSupplier(supplierDetail).then(
      () => {
        history.push('/admin/suppliers');
        enqueueSnackbar('Update supplier success', { variant: 'success' });
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
    setSupplier({ ...supplierDetail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    SuppliersService.getSupplier(parseInt(id, undefined)).then((res) => {
      setSupplier(res.data.supplier);
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
            {supplierDetail.id === 0 ? (
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
                    defaultValue={supplierDetail.name}
                    style={{ height: '56px' }}
                  />
                  <label>Phone number:</label>
                  <input
                    type="text"
                    placeholder="phone number..."
                    className="form-control"
                    onChange={handleInputChange}
                    autoComplete="on"
                    name="phone"
                    defaultValue={supplierDetail.phone}
                    style={{ height: '56px' }}
                  />
                  <label>Address:</label>
                  <input
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control"
                    id="comment"
                    autoComplete="on"
                    name="address"
                    defaultValue={supplierDetail.address}
                    style={{ height: '56px' }}
                  />
                  <label>Description:</label>
                  <textarea
                    placeholder="description..."
                    onChange={handleInputChange}
                    className="form-control"
                    rows={5}
                    id="comment"
                    autoComplete="on"
                    name="description"
                    defaultValue={supplierDetail.description}
                  />
                </div>

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
