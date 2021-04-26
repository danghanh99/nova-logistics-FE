import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Customer from '../../models/Customer';
import Product from '../../models/Product';
import CustomersService from '../../services/CustomersService';
import ExportsService from '../../services/ExportsService';
import ProductsService from '../../services/ProductsService';
import { getCustomers } from '../Customers/CustomersSlice';
import { IState } from '../Products/Products';
import { getProducts } from '../Products/ProductSlice';
import { useSnackbar } from 'notistack';
import IMeta from '../../types/MetaType';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../pages/Exports/style.css';
import { yupResolver } from '@hookform/resolvers/yup';
import './../Imports/Imports.scss';

type StateCustomer = {
  customers: {
    data: Customer[];
    meta: IMeta;
  };
};

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
    quantity: yup.number().positive().integer().max(999999999).required(),
    sell_price: yup.number().integer().max(999999999).positive().required(),
    description: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const listProducts = useSelector((state: IState) => state.products.data);
  const listCustomer = useSelector(
    (state: StateCustomer) => state.customers.data
  );

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
  }, []);

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
    ).then(
      () => {
        history.push('/admin/exports');
        enqueueSnackbar('Create export success', { variant: 'success' });
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
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 auto-center-form">
            {listProducts === [] && listCustomer === [] ? (
              <ClipLoader color="#FFC0CB" loading={true} size={400} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="inputEmail4">Product</label>
                <Autocomplete
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
                    <TextField {...params} variant="outlined" label="Name..." />
                  )}
                />
                <label htmlFor="inputPassword4">Customer</label>
                <Autocomplete
                  id="combo-box-demo"
                  className="bgc-white"
                  options={listCustomer}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  onChange={handleChangeCustomerImport}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Name..." />
                  )}
                />
                <label htmlFor="inputAddress">Date</label>
                <input
                  type="date"
                  className="form-control height-56"
                  value={exportDetail.exported_date}
                  onChange={changeValue}
                  name="exported_date"
                  defaultValue={currentDate}
                />
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewExport;
