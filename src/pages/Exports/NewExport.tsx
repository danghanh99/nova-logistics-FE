import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Customer from '../../models/Customer';
import Product from '../../models/Product';
import CustomersService from '../../services/CustomersService';
import ExportsService from '../../services/ExportsService';
import ProductsService from '../../services/ProductsService';
import { getCustomers } from '../Customers/CustomersSlice';
import { getProducts } from '../Products/ProductSlice';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../pages/Exports/style.css';
import { yupResolver } from '@hookform/resolvers/yup';
import './../Imports/Imports.scss';
import IState from '../../types/StateType';
import Loader from '../../modules/common/components/Loader/Loader';
import { isLoading } from '../../LoadingSlice';

function NewExport(): JSX.Element {
  const currentDate = new Date().toLocaleDateString('fr-CA');
  const init = {
    sell_price: 0,
    quantity: 0,
    description: '',
    exported_date: `${currentDate}`,
    product_id: 0,
    customer_id: 0,
  };
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError('quantity must be a number')
      .positive()
      .integer()
      .max(999999999)
      .required(),
    sell_price: yup
      .number()
      .typeError('price must be a number')
      .integer()
      .max(999999999)
      .positive()
      .required(),
    description: yup.string(),
    product: yup.string().required('product must be exist'),
    customer: yup.string().required('customer must be exist'),
    exported_date: yup.string().required('date must be exist'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const listProducts = useSelector((state: IState) => state.products.data);
  const listCustomer = useSelector((state: IState) => state.customers.data);
  const loading = useSelector((state: IState) => state.isLoading);

  const dispatch = useDispatch();
  const [exportDetail, setExport] = useState(init);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    ProductsService.getProducts().then((res) => {
      dispatch(getProducts(res));
    });

    CustomersService.getCustomers().then((res) => {
      dispatch(getCustomers(res));
    });
  }, [dispatch]);

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExport({ ...exportDetail, [e.target.name]: e.target.value });
  };

  const handleChangeProductExport = (
    e: ChangeEvent<{}>,
    value: Product | null
  ) => {
    setExport({ ...exportDetail, product_id: value?.id || 0 });
  };

  const handleChangeCustomerImport = (
    e: ChangeEvent<{}>,
    value: Customer | null
  ) => {
    setExport({ ...exportDetail, customer_id: value?.id || 0 });
  };

  const {
    sell_price,
    quantity,
    description,
    exported_date,
    product_id,
    customer_id,
  } = exportDetail;
  const onSubmit = () => {
    ExportsService.createExport(
      sell_price,
      quantity,
      description,
      exported_date,
      product_id,
      customer_id
    )
      .then(() => {
        history.push('/admin/exports');
        setTimeout(() => {
          enqueueSnackbar('Create export success', { variant: 'success' });
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
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 auto-center-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="inputEmail4">Product</label>
              <Autocomplete
                {...register('product')}
                id="combo-box-demo"
                className="bgc-white"
                componentName="product"
                options={listProducts}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                onChange={handleChangeProductExport}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Name..."
                    name="product"
                  />
                )}
              />
              <p>{errors.product?.message}</p>
              <label htmlFor="inputPassword4">Customer</label>
              <Autocomplete
                {...register('customer')}
                id="combo-box-demo"
                className="bgc-white"
                options={listCustomer}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                onChange={handleChangeCustomerImport}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Name..."
                    name="customer"
                  />
                )}
              />
              <p>{errors.customer?.message}</p>
              <label htmlFor="inputAddress">Date</label>
              <input
                {...register('exported_date')}
                type="date"
                className="form-control height-56"
                value={exportDetail.exported_date}
                onChange={changeValue}
                name="exported_date"
                defaultValue={currentDate}
              />
              <p>{errors.exported_date?.message}</p>
              <div className="form-row">
                <div className="col-6">
                  <label htmlFor="inputAddress2">Quantity</label>
                  <input
                    {...register('quantity')}
                    className="form-control height-56"
                    onChange={changeValue}
                    name="quantity"
                  />
                  <p>{errors.quantity?.message}</p>
                </div>
                <div className="col-6">
                  <label htmlFor="inputCity">Price</label>
                  <input
                    {...register('sell_price')}
                    className="form-control height-56"
                    onChange={changeValue}
                    name="sell_price"
                  />
                  <p>{errors.sell_price?.message}</p>
                </div>
              </div>
              <label>Descripton</label>
              <textarea
                className="form-control height-56"
                rows={5}
                cols={60}
                onChange={changeValue}
                name="description"
              ></textarea>
              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-3"
                >
                  Create
                </button>
              </div>
            </form>
            <Loader isLoading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewExport;
