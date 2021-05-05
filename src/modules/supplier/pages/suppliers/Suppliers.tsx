import CIcon from '@coreui/icons-react';
import '../../../common/UI/Table.css';
import ISupplier from '../../services/api/types/Supplier';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SuppliersService from '../../services/api/supplierApiClient';
import { getSuppliers } from '../../services/state/SuppliersSlice';
import { plainToClass } from 'class-transformer';
import Pagination from '../../../common/components/Pagination/Pagination';
import { useHistory } from 'react-router-dom';
import Loader from '../../../common/components/Loader/Loader';
import IState from '../../../common/services/api/types/StateType';
import Table from '../../../common/UI/Table';
import Headers from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Content from '../../components/Content/Content';
import Select from '../../components/Select/Select';
import { cilPlaylistAdd } from '../../../../assets/icons';

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
  const loading = useSelector((state: IState) => state.isLoading);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [iconSort, setIconSort] = useState(initIconSort);
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const meta = useSelector((state: IState) => state.suppliers.meta);
  const listSuppliers = plainToClass(
    ISupplier,
    useSelector((state: IState) => state.suppliers.data)
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const [page, setPage] = useState(1);

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
      phone_desc: '',
      phone_asc: '',
      address_desc: '',
      address_asc: '',
      description_desc: '',
      description_asc: '',
      [enableIcon]: 'text-success',
    });
  };

  const handlerPage = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    SuppliersService.getSuppliers(page, perPage, search, sort)
      .then((res) => {
        dispatch(getSuppliers(res));
      })
      .catch((error) => {
        throw error;
      });
  }, [page, perPage, search, sort, dispatch]);
  return (
    <>
      <div className="row mb-4">
        <Search onSearch={onSeachChange} />
        <Select handleChange={onPerPageChange} perPage={perPage} />
        <div className="col-4 text-right">
          <button
            onClick={() => history.push('/admin/suppliers/new')}
            type="button"
            className="btn btn-info"
          >
            <CIcon content={cilPlaylistAdd} className="btn-icon mr-2"></CIcon>
            New Supplier
          </button>
        </div>
      </div>
      <Table className="table table-bordered table-striped table-hover">
        <Headers onSort={onSort} iconSort={iconSort} />
        <Content listSuppliers={listSuppliers} />
      </Table>
      <div className="col-12 pr-0">
        <Pagination meta={meta} handlerPage={handlerPage} />
      </div>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Suppliers;
