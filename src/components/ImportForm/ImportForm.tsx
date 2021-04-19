import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Product from '../../models/Product';
import { ChangeEvent, useEffect, useState } from 'react';
import { plainToClass } from 'class-transformer';
import Supplier from '../../models/Supplier';
import Import from '../../models/Import';
import { useForm } from 'react-hook-form';
import ImportsService from '../../services/ImportsService';
import { newImport, reset } from '../../pages/Imports/ImportsSlice';
import ProductsService from '../../services/ProductsService';
import { getProducts } from '../../pages/Products/ProductSlice';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from '../../pages/Suppliers/SuppliersSlice';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
interface IFormInput {
  inputProduct: string;
}

export interface IState {
  products: Product[];
  suppliers: Supplier[];
  imports: Import[];
}

const ImportForm = () => {
  const [inputProduct, setInputProduct] = useState('');
  const [inputSupplier, setInputSupplier] = useState('');
  const { handleSubmit } = useForm<IFormInput>();
  const currentDate = new Date().toLocaleDateString('fr-CA');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const initial: Import = {
    quantity: 0,
    description: '',
    id: 0,
    imported_date: '2021-04-14',
    retail_price: 0,
  };
  const history = useHistory();
  const [inputText, setInputText] = useState(initial);
  const { imported_date, description, retail_price, quantity } = inputText;

  const handleProductChange = (e: ChangeEvent<{}>, value: Product | null) => {
    setInputText({ ...inputText, product: value });
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const handleSupplierChange = (e: ChangeEvent<{}>, value: Supplier | null) => {
    setInputText({ ...inputText, supplier: value });
  };
  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products)
  );
  const listSuppliers = plainToClass(
    Supplier,
    useSelector((state: IState) => state.suppliers)
  );

  const onSubmit = () => {
    ImportsService.newImport(inputText).then(
      (res) => {
        dispatch(newImport(res));
        dispatch(reset(true));
        enqueueSnackbar('New import success', { variant: 'success' });
        history.push('/admin/imports');
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
  useEffect(() => {
    ProductsService.getProducts(inputProduct)
      .then((res) => {
        dispatch(getProducts(res.data));
      })
      .catch((error) => {
        throw error;
      });
    SuppliersService.getSuppliers(inputSupplier)
      .then((res) => {
        dispatch(getSuppliers(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, [inputProduct, inputSupplier]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Product:</label>
                <Autocomplete
                  id="combo-box-demo"
                  componentName="product"
                  options={listProducts}
                  getOptionLabel={(option: Product) => option.name}
                  onChange={handleProductChange}
                  style={{ backgroundColor: 'white' }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Name..." />
                  )}
                />
              </div>
              <div className="form-group">
                <label>Supplier:</label>
                <Autocomplete
                  id="combo-box-demo"
                  componentName="product"
                  options={listSuppliers}
                  getOptionLabel={(option: Supplier) => option.name}
                  onChange={handleSupplierChange}
                  style={{ backgroundColor: 'white' }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Name..." />
                  )}
                />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleTextChange}
                  autoComplete="off"
                  defaultValue={currentDate}
                  required
                  name="inputDate"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    onChange={handleTextChange}
                    autoComplete="off"
                    required
                    name="inputQuantity"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Price (VND):</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    onChange={handleTextChange}
                    autoComplete="off"
                    required
                    name="inputPrice"
                  />
                </div>
              </div>
              <label>Description:</label>
              <textarea
                onChange={handleTextChange}
                className="form-control"
                rows={5}
                id="comment"
                defaultValue={''}
                autoComplete="off"
                name="inputDescription"
              />
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImportForm;
