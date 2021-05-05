import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import Supplier from '../../services/api/types/Supplier';
import { useSnackbar } from 'notistack';
import SuppliersService from '../../services/api/supplierApiClient';
import * as yup from 'yup';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IState from '../../../common/services/api/types/StateType';
import Loader from '../../../../modules/common/components/Loader/Loader';
import { isLoading } from '../../../common/services/state/LoadingSlice';
type Params = {
  id: string;
};

export interface IStateSupplier {
  suppliers: Supplier[];
}

const EditSupplier = (): JSX.Element => {
  const loading = useSelector((state: IState) => state.isLoading);
  const schema = yup.object().shape({
    name: yup.string().max(64),
    phone: yup.string().matches(/^\d+$/, {
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

  const initial: Supplier = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    description: '',
  };
  const { id }: Params = useParams();
  const dispatch = useDispatch();
  const [supplierDetail, setSupplier] = useState(initial);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const onSubmit = (e: React.FormEvent) => {
    SuppliersService.editSupplier(supplierDetail)
      .then(() => {
        history.push('/admin/suppliers');
        enqueueSnackbar('Update supplier success', { variant: 'success' });
      })
      .catch((error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
        return error;
      });
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
  }, [id]);

  if (supplierDetail.id === 0) {
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
                    defaultValue={supplierDetail.name}
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
                    defaultValue={supplierDetail.phone}
                  />
                  <p>{errors.phone?.message}</p>
                </div>{' '}
                <div className="col-12">
                  <label>Address:</label>
                  <input
                    {...register('address')}
                    placeholder="address..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    id="comment"
                    autoComplete="on"
                    name="address"
                    defaultValue={supplierDetail.address}
                  />
                  <p>{errors.address?.message}</p>
                </div>
                <div className="col-12">
                  <label>Description:</label>
                  <textarea
                    {...register('description')}
                    placeholder="description..."
                    onChange={handleInputChange}
                    className="form-control height-56"
                    rows={5}
                    id="comment"
                    autoComplete="on"
                    name="description"
                    defaultValue={supplierDetail.description}
                  />
                  <p>{errors.description?.message}</p>
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

export default EditSupplier;
