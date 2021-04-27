import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import './Customers.css';
import Customer from '../../models/Customer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { plainToClass } from 'class-transformer';
import { getCustomers } from './CustomersSlice';
import CustomersService from '../../services/CustomersService';
import Pagination from '../../components/Pagination/Pagination';
import IMeta from '../../types/MetaType';
import { useSnackbar } from 'notistack';
import { reset } from '../Imports/ImportsSlice';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import IState from '../../types/StateType';

const initIconSort = {
  name_desc: '',
  name_asc: '',
  phone_number_desc: '',
  phone_number_asc: '',
  address_desc: '',
  address_asc: '',
};

const Customers = (): JSX.Element => {
  const loading = useSelector((state: IState) => state.isLoading);
  const [search, setSearch] = useState('');
  const [iconSort, setIconSort] = useState(initIconSort);
  const meta = useSelector((state: IState) => state.customers.meta);
  const [page, setPage] = useState(1);
  const listCustomers = plainToClass(
    Customer,
    useSelector((state: IState) => state.customers.data)
  );

  const dispatch = useDispatch();

  const onSort = (e: React.MouseEvent, name: string, value: string): void => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
    const enableIcon = `${name}_${value}`;
    setIconSort({
      ...iconSort,
      name_desc: '',
      name_asc: '',
      phone_number_desc: '',
      phone_number_asc: '',
      address_desc: '',
      address_asc: '',
      [enableIcon]: 'text-success',
    });
  };
  const headers = (): JSX.Element => {
    return (
      <tr>
        <th className="width-50 text-right">ID</th>
        <th>
          Name
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
          Phone Number
          <CIcon
            className={iconSort.phone_number_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'phone_number', 'desc')}
          />
          <CIcon
            className={iconSort.phone_number_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'phone_number', 'asc')}
          />
        </th>
        <th>
          Address
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
        <th className="width-200">Action</th>
      </tr>
    );
  };

  const history = useHistory();
  const handleEdit = (id: number) => {
    history.push(`/admin/customers/${id}`);
  };
  const children = (): React.ReactNode => {
    return (
      <>
        {listCustomers.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.name}</td>
              <td className="text-right">{value.phone_number}</td>
              <td className="text-left">{value.address}</td>
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

  const [perPage, setPerPage] = useState(10);
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

  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    CustomersService.getCustomers(page, perPage, search, sort)
      .then(
        (res) => {
          dispatch(getCustomers(res));
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
    return () => {
      dispatch(reset(true));
    };
  }, [page, perPage, search, sort]);
  return (
    <>
      <Table
        headers={headers()}
        modelName="Customer"
        search={onSearch()}
        children={children()}
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={select()}
      ></Table>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Customers;
