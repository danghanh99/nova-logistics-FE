import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Product from '../../models/Product';
import { plainToClass } from 'class-transformer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductsService from '../../services/ProductsService';
import { getProducts } from './ProductSlice';
import Pagination from '../../components/Pagination/Pagination';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import IState from '../../types/StateType';

const Products = (): JSX.Element => {
  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products.data)
  );
  const nameCol = ['Name', 'Quantity', 'Available ', 'Description'];

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const meta = useSelector((state: IState) => state.products.meta);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const sort = 'updated_at: desc, created_at: desc';
  const history = useHistory();
  const loading = useSelector((state: IState) => state.isLoading);

  useEffect(() => {
    ProductsService.getProducts(search, page, perPage, sort)
      .then((res) => {
        dispatch(getProducts(res));
      })
      .catch((error) => {
        throw error;
      });
  }, [search, page, perPage, sort]);

  const headers = (): JSX.Element => {
    return (
      <>
        <th className="width-50  text-right ">ID</th>
        {nameCol.map((value, index) => {
          return (
            <th key={index} className="text-center" scope="col">
              {value}
            </th>
          );
        })}
        <th className="width-200">Action</th>
      </>
    );
  };

  const onHandleEdit = (id: number) => {
    history.push(`/admin/products/edit/${id}`);
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
                  <button
                    className="btn mr-2 d-flex align-items-center btn-warning"
                    onClick={() => onHandleEdit(value.id)}
                  >
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

  const onchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = (): JSX.Element => {
    return (
      <>
        <input
          type="search"
          className="form-control sticky-top"
          placeholder="Search a name"
          onChange={onchangeSearch}
        />
      </>
    );
  };

  const hanleOnclick = (e: React.MouseEvent<HTMLElement>) => {
    const numberPages = parseInt(e.currentTarget.textContent || '', undefined);

    if (numberPages > 0) {
      setPage(parseInt(e.currentTarget.textContent || '', undefined));
    }
    if (e.currentTarget.textContent === 'Next') {
      if (meta.current_page < meta.total_pages) setPage(meta.current_page + 1);
    }
    if (e.currentTarget.textContent === 'Prev') {
      if (meta.current_page > 1) setPage(meta.current_page - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.target.value, undefined));
  };

  const select = () => {
    return (
      <>
        <select
          className="form-control d-inline-block width-auto"
          id="perpage"
          onChange={handleChange}
          value={perPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="-1">All</option>
          <option></option>
        </select>
      </>
    );
  };

  return (
    <>
      <Table
        headers={headers()}
        modelName="Product"
        search={onSearch()}
        children={children()}
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={select()}
      ></Table>
      <Loader isLoading={loading} />
    </>
  );
};

export default Products;
