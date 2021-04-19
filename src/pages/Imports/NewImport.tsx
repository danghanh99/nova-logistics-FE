import { useForm } from 'react-hook-form';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductsService from '../../services/ProductsService';
import { newImport, reset } from './ImportsSlice';
import Product from '../../models/Product';
import { plainToClass } from 'class-transformer';
import { getProducts } from '../Products/ProductSlice';
import Supplier from '../../models/Supplier';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from '../Suppliers/SuppliersSlice';
import ImportsService from '../../services/ImportsService';
import Import from '../../models/Import';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

interface IFormInput {
  inputProduct: string;
}

export interface IState {
  products: Product[];
  suppliers: Supplier[];
  imports: Import[];
}

const init = [{}];
const NewImport = (): JSX.Element => {
  const [inputProduct, setInputProduct] = useState('');
  const [inputSupplier, setInputSupplier] = useState('');
  const [] = useState(init);
  const initial = {
    inputDate: '',
    inputQuantity: 1,
    inputPrice: 1,
    inputDescription: '',
  };
  const [inputText, setInputText] = useState(initial);
  const dispatch = useDispatch();
  const currentDate = new Date().toLocaleDateString('fr-CA');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProduct(e.target.value);
  };
  const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSupplier(e.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const { handleSubmit } = useForm<IFormInput>();

  const { inputDate, inputDescription, inputPrice, inputQuantity } = inputText;

  const onSubmit = () => {
    const formValues = {
      product_id:
        listProducts[
          listProducts.findIndex((item) => item.name === inputProduct)
        ].id,
      supplier_id:
        listSuppliers[
          listSuppliers.findIndex((item) => item.name === inputSupplier)
        ].id,
      import_date: inputDate || currentDate,
      quantity: inputQuantity,
      price: inputPrice,
      description: inputDescription || '',
    };
    ImportsService.newImport(formValues).then(
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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products)
  );

  const listSuppliers = plainToClass(
    Supplier,
    useSelector((state: IState) => state.suppliers)
  );

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
      <form onSubmit={handleSubmit(onSubmit)} className="add-items form-group">
        <div className="form-group">
          <label>Product:</label>
          <input
            type="text"
            value={inputProduct}
            onChange={handleValueChange}
            placeholder="Product name..."
            className="form-control todo-list-input"
            list="item_name_list"
            autoComplete="off"
            required
            name="inputProduct"
          />
          {listProducts && (
            <datalist id="item_name_list">
              {listProducts.map((item) => {
                return <option key={item.id}>{item.name}</option>;
              })}
              ;
            </datalist>
          )}
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
        <div className="form-group">
          <label>Supplier:</label>
          <input
            type="text"
            className="form-control"
            onChange={handleSupplierChange}
            placeholder="Supplier name..."
            list="item_supplier_list"
            autoComplete="off"
            required
            name="inputSupplier"
          />
          {listSuppliers && (
            <datalist id="item_supplier_list">
              {listSuppliers.map((item) => {
                return <option key={item.id} value={item.name} />;
              })}
            </datalist>
          )}
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
            className="btn-success add btn btn-primary font-weight-bold todo-list-add-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewImport;
