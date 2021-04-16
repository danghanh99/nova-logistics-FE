import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports, deleteImport, reset } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import { BiExport } from 'react-icons/bi';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import IMeta from '../../types/MetaType';
import { useHistory } from 'react-router-dom';
import './Imports.scss';

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
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const dispatch = useDispatch();

  useEffect(() => {
    ImportsService.getImports(page, perPage, search, sort)
      .then(
        (res) => {
          dispatch(getImports(res));
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
      )
      .catch((error) => {
        throw error;
      });
    return () => {
      dispatch(reset(true));
    };
  }, [page, perPage, search, sort]);

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

  const onSort = (e: React.MouseEvent, name: string, value: string): void => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
  };

  const headers = (): JSX.Element => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>Product</th>
        <th>Supplier</th>
        <th>
          Quantity
          <i>
            <CIcon
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'quantity', 'desc')}
            />
            <CIcon
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'quantity', 'asc')}
            />
          </i>
        </th>
        <th>
          Price
          <i>
            <CIcon
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'retail_price', 'desc')}
            />
            <CIcon
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'retail_price', 'asc')}
            />
          </i>
        </th>
        <th>
          Import Date
          <i>
            <CIcon
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'imported_date', 'desc')}
            ></CIcon>
            <CIcon
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'imported_date', 'asc')}
            ></CIcon>
          </i>
        </th>
        <th>Description</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  const onHandleEdit = (id: number) => {
    history.push(`/admin/imports/edit/${id}`);
  };

  const onHandleDelete = (id: number) => {
    ImportsService.deleteImport(id).then(
      () => {
        setSuccess(true);
        setMessage('Delete Import Success');
        dispatch(deleteImport(id));
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccess(false);
      }
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listImports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{value.id}</td>
              <td className="text-left">{value.product?.name}</td>
              <td className="text-left">{value.supplier?.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.retail_price}</td>
              <td className="text-right">{value.imported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-success">
                    <BiExport className="c-icon" />
                  </button>
                  <button
                    className="btn mr-2 d-flex align-items-center btn-warning"
                    onClick={() => onHandleEdit(value.id)}
                  >
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
                  </button>
                  <button
                    className="btn mr-2 d-flex align-items-center btn-danger"
                    onClick={() => onHandleDelete(value.id)}
                  >
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
      {message && (
        <div className={`alert alert-${success ? 'success' : 'danger'}`}>
          <strong>{message}</strong>
        </div>
      )}
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
