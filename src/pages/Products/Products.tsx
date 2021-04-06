import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
// import ReactPaginate from 'react-paginate';

const Products = (): JSX.Element => {
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
            New Product
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" className="cursor-pointer">
                <i className="cil-arrow-top">Name</i>
                <i className="cil-arrow-bottom"></i>
              </th>
              <th scope="col" className="cursor-pointer text-center">
                <i className="cil-arrow-top">Phone Number</i>
                <i className="cil-arrow-bottom"></i>
              </th>
              <th scope="col" className="cursor-pointer">
                <i className="cil-arrow-top">Address</i>
                <i className="cil-arrow-bottom"></i>
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tran Quang Huy</td>
              <td className="text-center">0935270046</td>
              <td>10B Nguyen Chi Thanh</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-primary mr-2 d-flex align-items-center">
                    <CIcon content={freeSet.cilBrush}></CIcon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="alert alert-warning text-center" role="alert"></div>
        <div className="col-12 pr-0">
          {/* <Pagination
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Products;
