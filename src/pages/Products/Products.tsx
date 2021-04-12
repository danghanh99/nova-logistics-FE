import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import data from '../Suppliers/SuppliersData';
import { freeSet } from '@coreui/icons';
import Product from '../../models/Product';
import { plainToClass } from 'class-transformer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProductsService from '../../services/ProductsService';
import { getProducts } from './ProductSlice';

export interface IState {
  products: Product[];
}
const Products = (): JSX.Element => {
  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products)
  );
  const nameCol = ['Name', 'Quantity', 'Available ', 'Description'];

  const dispatch = useDispatch();

  useEffect(() => {
    ProductsService.getProducts()
      .then((res) => {
        dispatch(getProducts(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const headers = (): JSX.Element => {
    return (
      <>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        {nameCol.map((value, index) => {
          return (
            <th key={index} style={{ textAlign: 'center' }} scope="col">
              {value}
            </th>
          );
        })}
        <th style={{ width: '200px' }}>Action</th>
      </>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listProducts.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.name}</td>
              <td className="text-right">{value.total_quantity}</td>
              <td className="text-right">{value.total_available_quantity}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-warning">
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Table
        headers={headers()}
        modelName="Product"
        children={children()}
      ></Table>
    </>
  );
};

export default Products;
