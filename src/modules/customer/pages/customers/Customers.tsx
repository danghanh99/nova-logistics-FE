import CIcon from '@coreui/icons-react';
import '../../../common/UI/Table.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { plainToClass } from 'class-transformer';
import { useHistory } from 'react-router-dom';
import Loader from '../../../common/components/Loader/Loader';
import IState from '../../../common/services/api/types/StateType';
import Table from '../../../common/UI/Table';
import Headers from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Content from '../../components/Content/Content';
import Select from '../../components/Select/Select';
import { cilPlaylistAdd } from '../../../../assets/icons';
import Customer from '../../services/api/types/Customer';
import CustomersService from '../../services/api/customerApiClient';
import { getCustomers, reset } from '../../services/state/CustomersSlice';
import Pagination from '../../../common/components/Pagination/Pagination';

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

  const history = useHistory();

  const [perPage, setPerPage] = useState(10);

  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  useEffect(() => {
    CustomersService.getCustomers(page, perPage, search, sort)
      .then((res) => {
        dispatch(getCustomers(res));
      })
      .catch((error) => {
        throw error;
      });
    return () => {
      dispatch(reset(true));
    };
  }, [page, perPage, search, sort, dispatch]);

  const onSeachChange = (value: string) => {
    setSearch(value);
  };

  const onPerPageChange = (value: number) => {
    setPerPage(value);
  };

  const onSort = (name: string, value: string): void => {
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

  const handlerPage = (value: number) => {
    setPage(value);
  };
  return (
    <>
      <div className="row mb-4">
        <Search onSearch={onSeachChange} />
        <Select handleChange={onPerPageChange} perPage={perPage} />
        <div className="col-4 text-right">
          <button
            onClick={() => history.push('/admin/customers/new')}
            type="button"
            className="btn btn-info"
          >
            <CIcon content={cilPlaylistAdd} className="btn-icon mr-2"></CIcon>
            New Customer
          </button>
        </div>
      </div>
      <Table className="table table-bordered table-striped table-hover">
        <Headers onSort={onSort} iconSort={iconSort} />
        <Content listCustomers={listCustomers} />
      </Table>
      <div className="col-12 pr-0">
        <Pagination meta={meta} handlerPage={handlerPage} />
      </div>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Customers;
