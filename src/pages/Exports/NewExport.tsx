import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Customer from '../../models/Customer';
import Product from '../../models/Product';
import CutomersService from '../../services/CutomersService';
import ExportsService from '../../services/ExportsService';
import ProductsService from '../../services/ProductsService';
import { getCustomers } from '../Customers/CustomersSlice';
import { IState } from '../Products/Products';
import { getProducts } from '../Products/ProductSlice';
import { useSnackbar } from 'notistack';

type StateCustomer = {
  customers: Customer[];
};

const init = {
  sell_price: 0,
  quantity: 0,
  description: '',
  exported_date: Date.now.toString(),
  product_id: 0,
  customer_id: 0,
};

function NewExport(): JSX.Element {
  const listProducts = useSelector((state: IState) => state.products);
  const listCustomer = useSelector((state: StateCustomer) => state.customers);
  const dispatch = useDispatch();
  const [exportDetail, setExport] = useState(init);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ProductsService.getProducts().then((res) => {
      dispatch(getProducts(res.data));
    });

    CutomersService.getCustomers().then((res) => {
      dispatch(getCustomers(res.data));
    });
  });

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            {listProducts === [] && listCustomer === [] ? (
              <ClipLoader color="#FFC0CB" loading={true} size={400} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputEmail4">Product</label>
                  <Autocomplete
                    value={listProducts.find(
                      (item) => item.id === exportDetail.product_id
                    )}
                    id="combo-box-demo"
                    componentName="product"
                    options={listProducts}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeProductExport}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword4">Customer</label>
                  <Autocomplete
                    value={listCustomer.find(
                      (item) => item.id === exportDetail.customer_id
                    )}
                    id="combo-box-demo"
                    options={listCustomer}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeCustomerImport}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={exportDetail.exported_date}
                    onChange={changeValue}
                    name="exported_date"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      value={exportDetail.quantity}
                      onChange={changeValue}
                      name="quantity"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      value={exportDetail.sell_price}
                      onChange={changeValue}
                      name="sell_price"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Descripton</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      cols={60}
                      onChange={changeValue}
                      value={exportDetail.description}
                      name="description"
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewExport;
