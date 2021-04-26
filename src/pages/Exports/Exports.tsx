import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Export from '../../models/Export';
import { plainToClass } from 'class-transformer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ExportsService from '../../services/ExportsService';
import { deleteExport, getExports } from './ExportsSlice';
import Pagination from '../../components/Pagination/Pagination';
import IMeta from '../../types/MetaType';
import { useSnackbar } from 'notistack';

export interface IState {
  exports: {
    data: Export[];
    meta: IMeta;
  };
}

const Exports = (): JSX.Element => {
  const listExports = plainToClass(
    Export,
    useSelector((state: IState) => state.exports.data)
  );

  const initIconSort = {
    quantity_desc: '',
    quantity_asc: '',
    sell_price_desc: '',
    sell_price_asc: '',
    exported_date_desc: '',
    exported_date_asc: '',
  };

  const [iconSort, setIconSort] = useState(initIconSort);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const meta = useSelector((state: IState) => state.exports.meta);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState('updated_at: desc, created_at: desc');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ExportsService.getExports(page, perPage, search, sort)
      .then(
        (res) => {
          dispatch(getExports(res));
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

  const onSort = (e: React.MouseEvent, name: string, value: string): void => {
    const sortType = `${name}: ${value}`;
    setSort(sortType);
    const enableIcon = `${name}_${value}`;
    setIconSort({
      ...iconSort,
      quantity_desc: '',
      quantity_asc: '',
      sell_price_asc: '',
      sell_price_desc: '',
      exported_date_asc: '',
      exported_date_desc: '',
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
              className={iconSort.sell_price_desc}
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'sell_price', 'desc')}
            />
            <CIcon
              className={iconSort.sell_price_asc}
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'sell_price', 'asc')}
            />
          </i>
        </th>
        <th>
          Export Date
          <i>
            <CIcon
              className={iconSort.exported_date_desc}
              content={freeSet.cilArrowTop}
              onClick={(e) => onSort(e, 'exported_date', 'desc')}
            ></CIcon>
            <CIcon
              className={iconSort.exported_date_asc}
              content={freeSet.cilArrowBottom}
              onClick={(e) => onSort(e, 'exported_date', 'asc')}
            ></CIcon>
          </i>
        </th>
        <th>Description</th>
        <th className="width-200">Action</th>
      </tr>
    );
  };

  const onHandleDelete = (id: number) => {
    ExportsService.deleteExport(id).then(
      () => {
        dispatch(deleteExport(id));
        enqueueSnackbar('Delete export success', { variant: 'success' });
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
        {listExports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.imports[0].product?.name}</td>
              <td className="text-left">{value.customer?.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.sell_price}</td>
              <td className="text-right">{value.exported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
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

  const onchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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

  return (
    <>
      <Table
        headers={headers()}
        modelName="Export"
        search={onSearch()}
        children={children()}
        pagination={<Pagination meta={meta} hanleOnclick={hanleOnclick} />}
        select={select()}
      ></Table>
    </>
  );
};

export default Exports;
