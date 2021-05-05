import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilPlaylistAdd } from '../../../../assets/icons';
import Table from '../../../common/UI/Table';
import Search from '../../../common/components/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { plainToClass } from 'class-transformer';
import IState from '../../../../types/StateType';
import Loader from '../../../common/components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../common/components/Pagination/Pagination';
import Select from '../../../common/components/Select/Select';
import ProductsService from '../../services/api/productApiClitent';
import { getProducts } from '../../services/state/ProductSlice';
import Headers from '../../components/Headers/Headers';
import Content from '../../components/Content/Content';
import Product from '../../../../models/Product';

const Imports = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const listProducts = plainToClass(
    Product,
    useSelector((state: IState) => state.products.data)
  );
  const loading = useSelector((state: IState) => state.isLoading);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const sort = 'updated_at: desc, created_at: desc';
  const meta = useSelector((state: IState) => state.products.meta);
  useEffect(() => {
    ProductsService.getProducts(search, page, perPage, sort).then((res) => {
      dispatch(getProducts(res));
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

  return (
    <>
      <div className="row mb-4">
        <Search onSearch={onHandlerSeach} />
        <Select handleChange={onHandleChange} perPage={perPage} />
        <div className="col-4 text-right">
          <button
            onClick={() => history.push('/admin/products/new')}
            type="button"
            className="btn btn-info"
          >
            <CIcon content={cilPlaylistAdd} className="btn-icon mr-2"></CIcon>
            New Import
          </button>
        </div>
      </div>
      <Table className="table table-bordered table-striped table-hover">
        <Headers />
        <Content listProducts={listProducts} />
      </Table>
      <div className="col-12 pr-0">
        <Pagination meta={meta} handlerPage={handlerPage} />
      </div>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Imports;
