import Table from '../../components/Table/Table';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports, deleteImport } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import './Imports.scss';
import { useSnackbar } from 'notistack';
import Loader from '../../components/Loader/Loader';
import IState from '../../types/StateType';
import Search from './Search/Search';
import Headers from './Headers/Headers';
import Children from './Children/Children';
import Select from './Select/Select';

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
  const loading = useSelector((state: IState) => state.isLoading);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');
  const dispatch = useDispatch();

  useEffect(() => {
    ImportsService.getImports(page, perPage, search, sort).then((res) =>
      dispatch(getImports(res))
    );
  }, [page, perPage, search, sort]);

  const onSort = (e: React.MouseEvent, name: string, value: string): void => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
    const enableIcon = `${name}_${value}`;
    setIconSort({
      ...initIconSort,
      [enableIcon]: 'text-success',
    });
  };

  const onHandleDelete = (id: number) => {
    ImportsService.deleteImport(id).then(() => {
      dispatch(deleteImport(id));
      enqueueSnackbar('Delete import success', { variant: 'success' });
    });
  };

  const handleChange = (value: string) => {
    setPerPage(parseInt(value, undefined));
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

  const onsearch = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <Table
        headers={<Headers onSort={onSort} iconSort={iconSort} />}
        modelName="Import"
        search={<Search onsearch={onsearch} />}
        children={
          <Children listImports={listImports} onHandleDelete={onHandleDelete} />
        }
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={<Select handleChange={handleChange} perPage={perPage} />}
      ></Table>
      <Loader isLoading={loading}></Loader>
    </>
  );
};

export default Imports;
