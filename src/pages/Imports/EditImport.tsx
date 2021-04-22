import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ImportsService from '../../services/ImportsService';
import { reset } from './ImportsSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import Import from '../../models/Import';
import ProductsService from '../../services/ProductsService';
import { getProducts } from '../Products/ProductSlice';
import { IState } from '../Products/Products';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from '../Suppliers/SuppliersSlice';
import Supplier from '../../models/Supplier';
import Product from '../../models/Product';
import { useSnackbar } from 'notistack';
import IMeta from '../../types/MetaType';

type Params = {
  id: string;
};
const init: Import = {
  quantity: 0,
  description: '',
  id: 0,
  imported_date: '2021-04-14',
  retail_price: 0,
};
export interface IStateSupplier {
  suppliers: {
    data: Supplier[];
    meta: IMeta;
  };
}

const EditImport = (): JSX.Element => {
  const { id }: Params = useParams();
  const dispatch = useDispatch();
  const listProducts = useSelector((state: IState) => state.products);
  const listSuppliers = useSelector((state: IStateSupplier) => state.suppliers);
  const history = useHistory();
  const [importDetail, setImport] = useState(init);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ImportsService.getImport(parseInt(id, undefined)).then((res) => {
      setImport(res.data.import);
    });
    ProductsService.getProducts().then((res) => {
      dispatch(getProducts(res));
    });
    SuppliersService.getSuppliers().then((res) => {
      dispatch(getSuppliers(res));
      console.log(res);
    });
    return () => {
      dispatch(reset(true));
    };
  }, []);

  const handleChangeProductImport = (
    e: ChangeEvent<{}>,
    value: Product | null
  ) => {
    setImport({ ...importDetail, product: value });
  };

  const handleChangeSupplierImport = (
    e: ChangeEvent<{}>,
    value: Supplier | null
  ) => {
    setImport({ ...importDetail, supplier: value });
  };

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImport({ ...importDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ImportsService.updateImport(importDetail).then(
      () => {
        history.push('/admin/imports');
        enqueueSnackbar('Update import success', { variant: 'success' });
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
            {importDetail.id === 0 ? (
              <ClipLoader color="#FFC0CB" loading={true} size={400} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputEmail4">Product</label>
                  <Autocomplete
                    defaultValue={importDetail.product}
                    id="combo-box-demo"
                    componentName="product"
                    options={listProducts.data}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeProductImport}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword4">Supplier</label>
                  <Autocomplete
                    defaultValue={importDetail.supplier}
                    id="combo-box-demo"
                    options={listSuppliers.data}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeSupplierImport}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue={importDetail.imported_date}
                    onChange={changeValue}
                    name="imported_date"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      defaultValue={importDetail.quantity}
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
                      defaultValue={importDetail.retail_price}
                      onChange={changeValue}
                      name="retail_price"
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
                      defaultValue={importDetail.description}
                      onChange={changeValue}
                      name="description"
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditImport;
