import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import Pagination from '../Pagination/Pagination';
import { render } from '@testing-library/react';
import { getSuppliers } from '../../pages/Suppliers/SuppliersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { enableShowForm } from '../../pages/Suppliers/showNewFormSlice';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ProductsService from '../../services/ProductsService';
import { getProducts } from '../../pages/Products/ProductSlice';
import Product from '../../models/Product';
import { useEffect, useState } from 'react';
import { plainToClass } from 'class-transformer';
import Supplier from '../../models/Supplier';
import Import from '../../models/Import';
interface IFormInput {
  inputProduct: string;
}

export interface IState {
  products: Product[];
  suppliers: Supplier[];
  imports: Import[];
}

const InputForm = (name: string) => {
  const [inputProduct, setInputProduct] = useState('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProduct(e.target.value);
  };
  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products)
  );
  return (
    <>
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
        />
        {listProducts && (
          <datalist id="item_name_list">
            {listProducts.map((item, index) => {
              return <option key={item.id}>{item.name}</option>;
            })}
            ;
          </datalist>
        )}
      </div>
    </>
  );
};
export default InputForm;
