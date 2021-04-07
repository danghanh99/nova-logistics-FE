import CIcon from '@coreui/icons-react';
import suppliersData from './SuppliersData';
import { freeSet } from '@coreui/icons';
function Supplier() {
  const nameCol = [
    'ID',
    'Phone Number',
    'Address',
    'Date',
    'Description',
    'Action',
  ];
  const colTable = nameCol.map((value) => {
    return <th style={{ textAlign: 'center' }}>{value}</th>;
  });

  const data = suppliersData.map((value) => {
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{value.ID}</td>
        <td style={{ textAlign: 'right' }}>{value.PhoneNumber}</td>
        <td>{value.Address}</td>
        <td style={{ textAlign: 'right' }}>{value.Date}</td>
        <td>{value.Description}</td>
        <td className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              className="btn mr-2 btn-warning"
              style={{ width: '70px' }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ width: '70px' }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="example">
      <div className="container ">
        <div className="row">
          <div
            className="d-flex input-group mb-2"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search... "
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append ">
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>
            <button className="btn btn-success col-md-2" type="button">
              <CIcon content={freeSet.cilUser} className="mr-2" />
              New Supplier
            </button>
          </div>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>{colTable}</tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
        <div
          className="pagination active "
          style={{ position: 'absolute', left: '50%' }}
        >
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">
            2
          </a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
