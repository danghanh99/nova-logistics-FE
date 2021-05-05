import Select from '../../../common/components/Select/Select';
import Search from '../../../common/components/Search/Search';
import { useHistory } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilPlaylistAdd } from '../../../../assets/icons';
import { useEffect, useState } from 'react';
import Table from '../../../common/UI/Table';
import PaginationControlled from '../../../common/components/Pagination/Pagination';
import Loader from '../../../common/components/Loader/Loader';
import Headers from '../../components/Headers/Headers';
import Content from '../../components/Content/Content';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { plainToClass } from 'class-transformer';
import Export from '../../../../models/Export';
import IState from '../../../../types/StateType';
import ExportsService from '../../services/api/exportApiClient';
import { deleteExport, getExports } from '../../services/state/ExportsSlice';
import { isLoading } from '../../../../LoadingSlice';

const Exports = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const listExports = plainToClass(
    Export,
    useSelector((state: IState) => state.exports.data)
  );
  const history = useHistory();
  const loading = useSelector((state: IState) => state.isLoading);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const meta = useSelector((state: IState) => state.exports.meta);
  const onHandlerSeach = (value: string) => {
    setSearch(value);
  };
  const onHandleChange = (value: number) => {
    setPerPage(value);
  };
  const onSort = (name: string, value: string) => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
  };
  const onHandleDelete = (id: number) => {
    ExportsService.deleteExport(id)
      .then(() => {
        dispatch(deleteExport(id));
        enqueueSnackbar('Delete import success', { variant: 'success' });
      })
      .catch((error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
        return error;
      });
  };
  const handlerPage = (value: number) => {
    setPage(value);
  };
  useEffect(() => {
    ExportsService.getExports(page, perPage, search, sort).then((res) => {
      dispatch(getExports(res));
    });
  }, [dispatch, search, perPage, page, sort]);
  return (
    <>
      <div className="row mb-4">
        <Search onSearch={onHandlerSeach} />
        <Select handleChange={onHandleChange} perPage={perPage} />
        <div className="col-4 text-right">
          <button
            onClick={() => history.push('/admin/exports/new')}
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
        <Content listExports={listExports} onHandleDelete={onHandleDelete} />
      </Table>
      <div className="col-12 pr-0">
        <PaginationControlled meta={meta} handlerPage={handlerPage} />
      </div>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Exports;
