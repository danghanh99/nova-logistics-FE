import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import './Suppliers.css';
import ISupplier from '../../models/Supplier';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from './SuppliersSlice';
import { plainToClass } from 'class-transformer';
import Pagination from '../../components/Pagination/Pagination';
import IMeta from '../../types/MetaType';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
export interface IState {
  suppliers: {
    data: ISupplier[];
    meta: IMeta;
  };
  newSupplier: boolean;
}

const initIconSort = {
  name_desc: '',
  name_asc: '',
  phone_desc: '',
  phone_asc: '',
  address_desc: '',
  address_asc: '',
  description_desc: '',
  description_asc: '',
};

const Suppliers = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [iconSort, setIconSort] = useState(initIconSort);
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const meta = useSelector((state: IState) => state.suppliers.meta);
  const listSuppliers = plainToClass(
    ISupplier,
    useSelector((state: IState) => state.suppliers.data)
  );
  const onSort = (e: React.MouseEvent, name: string, value: string): void => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
    const enableIcon = `${name}_${value}`;
    setIconSort({
      ...iconSort,
      name_desc: '',
      name_asc: '',
      phone_desc: '',
      phone_asc: '',
      address_desc: '',
      address_asc: '',
      description_desc: '',
      description_asc: '',
      [enableIcon]: 'text-success',
    });
  };

  const dispatch = useDispatch();
  const headers = (): JSX.Element => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>
          Name{' '}
          <CIcon
            className={iconSort.name_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'name', 'desc')}
          />
          <CIcon
            className={iconSort.name_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'name', 'asc')}
          />
        </th>
        <th>
          Phone Number{' '}
          <CIcon
            className={iconSort.phone_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'phone', 'desc')}
          />
          <CIcon
            className={iconSort.phone_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'phone', 'asc')}
          />
        </th>
        <th>
          Address{' '}
          <CIcon
            className={iconSort.address_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'address', 'desc')}
          />
          <CIcon
            className={iconSort.address_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'address', 'asc')}
          />
        </th>
        <th>Description</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  const history = useHistory();
  const handleEdit = (id: number) => {
    history.push(`/admin/suppliers/${id}`);
  };
  const children = (): React.ReactNode => {
    return (
      <>
        {listSuppliers.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.name}</td>
              <td className="text-right">{value.phone}</td>
              <td className="text-left">{value.address}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn mr-2 d-flex align-items-center btn-warning"
                    onClick={() => handleEdit(value.id)}
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
  const [page, setPage] = useState(1);
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
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    SuppliersService.getSuppliers(page, perPage, search, sort)
      .then(
        (res) => {
          dispatch(getSuppliers(res));
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
      )
      .catch((error) => {
        throw error;
      });
  }, [page, perPage, search, sort]);

  return (
    <>
      <Table
        headers={headers()}
        modelName="Supplier"
        search={onSearch()}
        children={children()}
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={select()}
      ></Table>
    </>
  );
};

export default Suppliers;
