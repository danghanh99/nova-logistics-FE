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
import IMeta from '../../types/MetaType';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../pages/Exports/style.css';
export interface IState {
  products: {
    data: Product[];
    meta: IMeta;
  };
  suppliers: {
    data: Supplier[];
    meta: IMeta;
  };
  imports: Import[];
}

const ImportForm = () => {
  const schema = yup.object().shape({
    quantity: yup.number().positive().integer().required(),
    retail_price: yup.number().positive().integer().required(),
    description: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [inputProduct] = useState('');
  const [inputSupplier] = useState('');
  const currentDate = new Date().toLocaleDateString('fr-CA');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const initial: Import = {
    quantity: 0,
    description: '',
    id: 0,
    imported_date: `${currentDate}`,
    retail_price: 0,
  };
  const history = useHistory();
  const [inputText, setInputText] = useState(initial);

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
    useSelector((state: IState) => state.products.data)
  );

  const listSuppliers = plainToClass(
    Supplier,
    useSelector((state: IState) => state.suppliers.data)
  );

  const onSubmit = () => {
    ImportsService.newImport(inputText).then(
      (res) => {
        dispatch(newImport(res));
        dispatch(reset(true));
        history.push('/admin/imports');
        enqueueSnackbar('New import success', { variant: 'success' });
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
        dispatch(getProducts(res));
      })
      .catch((error) => {
        throw error;
      });
    SuppliersService.getSuppliers()
      .then((res) => {
        dispatch(getSuppliers(res));
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
                  name="imported_date"
                  style={{ height: '56px' }}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Quantity:</label>
                  <input
                    {...register('quantity')}
                    className="form-control"
                    onChange={handleTextChange}
                    autoComplete="off"
                    name="quantity"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.quantity?.message}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Price (VND):</label>
                  <input
                    {...register('retail_price')}
                    className="form-control"
                    onChange={handleTextChange}
                    autoComplete="off"
                    name="retail_price"
                    style={{ height: '56px' }}
                  />
                  <p>{errors.retail_price?.message}</p>
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
                name="description"
              />
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-1"
                >
                  Create
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
