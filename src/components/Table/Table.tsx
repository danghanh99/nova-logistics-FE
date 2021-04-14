import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import Pagination from '../../components/Pagination/Pagination';
import { render } from '@testing-library/react';
import { getSuppliers } from '../../pages/Suppliers/SuppliersSlice';
import { useDispatch } from 'react-redux';
import { enableShowForm } from '../../pages/Suppliers/showNewFormSlice';
import { Link, Redirect, useHistory } from 'react-router-dom';
interface IProps {
  modelName: string;
  children: React.ReactNode;
  headers: JSX.Element;
}

const Table = (props: IProps) => {
  const { modelName, children, headers } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickNewIteam = () => {
    history.push('/admin/imports/new');
  };
  return (
    <>
      <div className="row mb-4">
        <div className="col-4">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <CIcon content={freeSet.cilSearch}></CIcon>
              </div>
            </div>
            <input
              type="search"
              className="form-control sticky-top"
              placeholder="Search a name"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label className="d-inline-block mr-3 ml-2">Items per page</label>
            <select
              className="form-control d-inline-block"
              style={{ width: 'auto' }}
              id="perpage"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option></option>
            </select>
          </div>
        </div>
        <div className="col-4 text-right">
          <button
            onClick={() => handleClickNewIteam()}
            type="button"
            className="btn btn-info"
          >
            <CIcon
              content={freeSet.cilPlaylistAdd}
              className="btn-icon mr-2"
            ></CIcon>
            New {modelName}
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>{headers}</thead>
          <tbody>{children}</tbody>
        </table>
        <div className="col-12 pr-0">
          <Pagination />
        </div>
      </div>
    </>
  );
};
export default Table;
