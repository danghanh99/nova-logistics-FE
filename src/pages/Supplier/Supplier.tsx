import CIcon from '@coreui/icons-react';
import suppliersData from './SuppliersData';
import { freeSet } from '@coreui/icons';
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react';
import { tmpdir } from 'os';
const fields = [
  'ID',
  'PhoneNumber',
  'Address',
  'Date',
  'Description',
  'Action',
];

function Supplier() {
  const data = suppliersData.map((value, index) => {
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
          <table className="table table-bordered table-striped table-hover ">
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>ID</th>
                <th style={{ textAlign: 'center' }}>Phone Number</th>
                <th style={{ textAlign: 'center' }}>Address</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Description</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
