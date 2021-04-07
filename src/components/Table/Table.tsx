import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import Pagination from '../../components/Pagination/Pagination';
import IProduct from '../../types/ProductType';
import ISupplier from '../../types/SupplierType';
interface IProps {
  colTable: string[];
  data: IProduct[];
  modelName: string;
}

const Table = (props: IProps) => {
  const { colTable, data, modelName } = props;

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
          <button type="button" className="btn btn-info">
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
          <thead>
            <tr>
              {colTable.map((value, index) => {
                return <th scope="col">{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr>
                  <td>{value.ID}</td>
                  <td>{value.PhoneNumber}</td>
                  <td className="text-center">{value.Address}</td>
                  <td>{value.Date}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-outline-primary mr-2 d-flex align-items-center">
                        <CIcon content={freeSet.cilBrush}></CIcon>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="col-12 pr-0">
          <Pagination />
        </div>
      </div>
    </>
  );
};
export default Table;
