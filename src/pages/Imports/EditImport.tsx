import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ImportsService from '../../services/ImportsService';
import { useState } from 'react';
import Import from '../../models/Import';
import ProductsService from '../../services/ProductsService';
import { getProducts } from '../Products/ProductSlice';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from '../Suppliers/SuppliersSlice';
import Supplier from '../../models/Supplier';
import Product from '../../models/Product';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../pages/Exports/style.css';
import { useForm } from 'react-hook-form';
import { plainToClass } from 'class-transformer';
import './Imports.scss';
import IState from '../../types/StateType';
import Loader from '../../components/Loader/Loader';
import { getImports, reset } from './ImportsSlice';

type Params = {
  id: string;
};

const EditImport = (): JSX.Element => {
  const schema = yup.object().shape({
    quantity: yup.number().positive().integer(),
    retail_price: yup.number().positive().integer(),
    description: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id }: Params = useParams();
  const dispatch = useDispatch();
  const listProducts = useSelector((state: IState) => state.products);
  const listSuppliers = useSelector((state: IState) => state.suppliers);
  const history = useHistory();
  const loading = useSelector((state: IState) => state.isLoading);
  const importDetail = plainToClass(
    Import,
    useSelector((state: IState) => state.imports.data).filter(
      (item: Import) => item.id === parseInt(id, undefined)
    )[0]
  );
  const [importForm, setImportForm] = useState<Import>(importDetail);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ImportsService.getImports().then((res) => {
      dispatch(getImports(res));
    });
    ProductsService.getProducts().then((res) => {
      dispatch(getProducts(res));
    });
    SuppliersService.getSuppliers().then((res) => {
      dispatch(getSuppliers(res));
    });
    return () => {
      dispatch(reset(true));
    };
  }, [dispatch, id]);

  const handleChangeProductImport = (
    e: ChangeEvent<{}>,
    value: Product | null
  ) => {
    setImportForm({ ...importDetail, product: value });
  };

  const handleChangeSupplierImport = (
    e: ChangeEvent<{}>,
    value: Supplier | null
  ) => {
    setImportForm({ ...importDetail, supplier: value });
  };

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImportForm({ ...importDetail, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    ImportsService.updateImport(importForm).then(() => {
      history.push('/admin/imports');
      setTimeout(() => {
        enqueueSnackbar('Update import success', { variant: 'success' });
      }, 500);
    });
  };

  if (!importDetail) {
    return <></>;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 auto-center-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Product:</label>
                <Autocomplete
                  defaultValue={importDetail?.product}
                  id="combo-box-demo"
                  className="bgc-white"
                  componentName="product"
                  options={listProducts.data}
                  getOptionLabel={(option) => option.name}
                  onChange={handleChangeProductImport}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={`${importDetail?.product?.name}`}
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label>Supplier:</label>
                <Autocomplete
                  defaultValue={importDetail?.supplier}
                  id="combo-box-demo"
                  className="bgc-white"
                  options={listSuppliers.data}
                  getOptionLabel={(option) => option.name}
                  onChange={handleChangeSupplierImport}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={`${importDetail?.supplier?.name}`}
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  {...register('imported_date')}
                  type="date"
                  className="form-control height-56"
                  onChange={changeValue}
                  autoComplete="off"
                  defaultValue={importDetail?.imported_date}
                  required
                  name="imported_date"
                />
              </div>
              <div className="form-row">
                <div className="col-6">
                  <label htmlFor="inputAddress2">Quantity</label>
                  <input
                    {...register('quantity')}
                    className="form-control height-56"
                    defaultValue={importDetail?.quantity}
                    onChange={changeValue}
                    name="quantity"
                  />
                  <p>{errors.quantity?.message}</p>
                </div>
                <div className="col-6">
                  <label htmlFor="inputCity">Price</label>
                  <input
                    {...register('retail_price')}
                    className="form-control height-56"
                    defaultValue={importDetail?.retail_price}
                    onChange={changeValue}
                    name="retail_price"
                  />
                  <p>{errors.retail_price?.message}</p>
                </div>
              </div>
              <label>Descripton</label>
              <textarea
                className="form-control height-56"
                rows={5}
                cols={60}
                defaultValue={importDetail?.description}
                onChange={changeValue}
                name="description"
              ></textarea>
              <div className="btn-right">
                <button
                  type="submit"
                  className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn mt-3"
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

export default EditImport;
