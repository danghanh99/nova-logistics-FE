import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import { BiExport } from 'react-icons/bi';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import IMeta from '../../types/MetaType';
export interface IState {
  imports: {
    data: Import[];
    meta: IMeta;
  };
}

const Imports = (): JSX.Element => {
  const listImports = plainToClass(
    Import,
    useSelector((state: IState) => state.imports.data)
  );

  const meta = useSelector((state: IState) => state.imports.meta);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    ImportsService.getImports(page, perPage, search)
      .then((res) => {
        dispatch(getImports(res));
      })
      .catch((error) => {
        throw error;
      });
  }, [page, perPage, search]);

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

  const headers = (): JSX.Element => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>Product</th>
        <th>Supplier</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Import Date</th>
        <th>Description</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listImports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.product.name}</td>
              <td className="text-left">{value.supplier.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.retail_price}</td>
              <td className="text-right">{value.imported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-success">
                    <BiExport className="c-icon" />
                  </button>
                  <button className="btn mr-2 d-flex align-items-center btn-warning">
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
                  </button>
                  <button className="btn mr-2 d-flex align-items-center btn-danger">
                    <CIcon content={freeSet.cilTrash}></CIcon>
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.target.value, undefined));
  };

  const select = () => {
    return (
      <>
        <select
          className="form-control d-inline-block"
          style={{ width: 'auto' }}
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

  return (
    <>
      <Table
        headers={headers()}
        modelName="Import"
        search={onSearch()}
        children={children()}
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={select()}
      ></Table>
    </>
  );
};

export default Imports;
