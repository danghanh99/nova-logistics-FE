import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilPlaylistAdd } from '../../../../assets/icons';
import Table from '../../../common/UI/Table';
import Headers from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Content from '../../components/Content/Content';
import ImportsService from '../../services/api/importApiClient';
import { useDispatch, useSelector } from 'react-redux';
import { getImports } from '../../../../pages/Imports/ImportsSlice';
import { plainToClass } from 'class-transformer';
import IState from '../../../../types/StateType';
import Import from '../../../../models/Import';
import Loader from '../../../common/components/Loader/Loader';
import Select from '../../components/Select/Select';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../common/components/Pagination/Pagination';
const Imports = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const listImports = plainToClass(
    Import,
    useSelector((state: IState) => state.imports.data)
  );
  const loading = useSelector((state: IState) => state.isLoading);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const meta = useSelector((state: IState) => state.imports.meta);
  useEffect(() => {
    ImportsService.getImports(page, perPage, search, sort).then((res) => {
      dispatch(getImports(res));
    });
  }, [dispatch, search, perPage, page, sort]);
  const onHandlerSeach = (value: string) => {
    setSearch(value);
  };
  const onHandleChange = (value: number) => {
    setPerPage(value);
  };

  const handlerPage = (value: number) => {
    setPage(value);
  };
  const onSort = (name: string, value: string) => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
  };

  return (
    <>
      <div className="row mb-4">
        <Search onSearch={onHandlerSeach} />
        <Select handleChange={onHandleChange} perPage={perPage} />
        <div className="col-4 text-right">
          <button
            onClick={() => history.push('/admin/imports/new')}
            type="button"
            className="btn btn-info"
          >
            <CIcon content={cilPlaylistAdd} className="btn-icon mr-2"></CIcon>
            New Import
          </button>
        </div>
      </div>
      <Table className="table table-bordered table-striped table-hover">
        <Headers onSort={onSort} />
        <Content listImports={listImports} />
      </Table>
      <div className="col-12 pr-0">
        <Pagination meta={meta} handlerPage={handlerPage} />
      </div>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Imports;
