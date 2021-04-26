import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports, deleteImport, reset } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import IMeta from '../../types/MetaType';
import { useHistory } from 'react-router-dom';
import './Imports.scss';
import { useSnackbar } from 'notistack';
import Loader from '../../components/Loader/Loader';
export interface IState {
  imports: {
    data: Import[];
    meta: IMeta;
  };
}

const initIconSort = {
  quantity_desc: '',
  quantity_asc: '',
  retail_price_desc: '',
  retail_price_asc: '',
  imported_date_desc: '',
  imported_date_asc: '',
};

const Imports = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const listImports = plainToClass(
    Import,
    useSelector((state: IState) => state.imports.data)
  );
  const [iconSort, setIconSort] = useState(initIconSort);
  const meta = useSelector((state: IState) => state.imports.meta);

  const loading = useSelector((state: any) => state.isLoading);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const dispatch = useDispatch();

  useEffect(() => {
    ImportsService.getImports(page, perPage, search, sort).then((res) =>
      dispatch(getImports(res))
    );
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
    const enableIcon = `${name}_${value}`;
    setIconSort({
      ...iconSort,
      quantity_desc: '',
      quantity_asc: '',
      retail_price_desc: '',
      retail_price_asc: '',
      imported_date_desc: '',
      imported_date_asc: '',
      [enableIcon]: 'text-success',
    });
  };

  const headers = (): JSX.Element => {
    return (
      <tr>
        <th className="width-50  text-right ">ID</th>
        <th>Product</th>
        <th>Supplier</th>
        <th>
          Quantity
          <i>
            <CIcon
              className={iconSort.quantity_desc}
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'quantity', 'desc')}
            />
            <CIcon
              className={iconSort.quantity_asc}
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'quantity', 'asc')}
            />
          </i>
        </th>
        <th>
          Price
          <i>
            <CIcon
              className={iconSort.retail_price_desc}
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'retail_price', 'desc')}
            />
            <CIcon
              className={iconSort.retail_price_asc}
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'retail_price', 'asc')}
            />
          </i>
        </th>
        <th>
          Import Date
          <i>
            <CIcon
              className={iconSort.imported_date_desc}
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'imported_date', 'desc')}
            ></CIcon>
            <CIcon
              className={iconSort.imported_date_asc}
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'imported_date', 'asc')}
            ></CIcon>
          </i>
        </th>
        <th>Description</th>
        <th className="width-200">Action</th>
      </tr>
    );
  };

  const onHandleDelete = (id: number) => {
    ImportsService.deleteImport(id).then(
      () => {
        dispatch(deleteImport(id));
        enqueueSnackbar('Delete import success', { variant: 'success' });
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

  const children = (): React.ReactNode => {
    return (
      <>
        {listImports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.product?.name}</td>
              <td className="text-left">{value.supplier?.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.retail_price}</td>
              <td className="text-right">{value.imported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn mr-2 d-flex align-items-center btn-warning"
                    onClick={() =>
                      history.push(`/admin/imports/edit/${value.id}`)
                    }
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
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Imports;
