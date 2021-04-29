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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../pages/Exports/style.css';
import IState from '../../types/StateType';
import { isLoading } from '../../LoadingSlice';

const NewImport = (): JSX.Element => {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError('quantity must be a number')
      .positive()
      .integer()
      .required()
      .label('quantity'),
    retail_price: yup
      .number()
      .typeError('price must be a number')
      .positive()
      .integer()
      .required()
      .label('price'),
    description: yup.string(),
    product: yup.string().required('product must be exist'),
    supplier: yup.string().required('supplier must be exist'),
    imported_date: yup.string().required('date must be exist'),
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
  const loading = useSelector((state: IState) => state.isLoading);
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
        setTimeout(() => {
          enqueueSnackbar('New import success', { variant: 'success' });
        }, 500);
      },
      (error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
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
  }, [inputProduct, inputSupplier, dispatch]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 auto-center-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Product:</label>
                <Autocomplete
                  {...register('product')}
                  id="combo-box-demo"
                  className="bgc-white"
                  options={listProducts}
                  getOptionLabel={(option: Product) => option.name}
                  onChange={handleProductChange}
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
              </div>
              <div className="form-group">
                <label>Supplier:</label>
                <Autocomplete
                  {...register('supplier')}
                  id="combo-box-demo"
                  options={listSuppliers}
                  getOptionLabel={(option: Supplier) => option.name}
                  onChange={handleSupplierChange}
                  className="bgc-white"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Name..."
                      name="supplier"
                    />
                  )}
                />
                <p>{errors.supplier?.message}</p>
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  {...register('imported_date')}
                  type="date"
                  className="form-control height-56"
                  onChange={handleTextChange}
                  autoComplete="off"
                  defaultValue={currentDate}
                  name="imported_date"
                />
                <p>{errors.imported_date?.message}</p>
              </div>
              <div className="form-row">
                <div className="col-6">
                  <label>Quantity:</label>
                  <input
                    {...register('quantity')}
                    className="form-control height-56"
                    onChange={handleTextChange}
                    autoComplete="off"
                    name="quantity"
                  />
                  <p>{errors.quantity?.message}</p>
                </div>
                <div className="col-6">
                  <label>Price (VND):</label>
                  <input
                    {...register('retail_price')}
                    className="form-control height-56"
                    onChange={handleTextChange}
                    autoComplete="off"
                    name="retail_price"
                  />
                  <p>{errors.retail_price?.message}</p>
                </div>
              </div>
              <label>Description:</label>
              <textarea
                onChange={handleTextChange}
                className="form-control height-56"
                rows={5}
                id="comment"
                defaultValue={''}
                autoComplete="off"
                name="description"
              />
              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-3 justify-content-center"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  &nbsp;{!loading ? 'Create' : 'Loading...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewImport;
