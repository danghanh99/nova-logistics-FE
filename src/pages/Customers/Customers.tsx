import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import data from './CustomersData';
import { freeSet } from '@coreui/icons';
import './Customers.css';
const Suppliers = (): JSX.Element => {
  const nameCol = ['ID', 'Phone Number', 'Address', 'Date', 'Action'];

  const headers = (): any => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  return (
    <>
      <Table headers={headers()} modelName="Customer">
        {data.map((value, index) => {
          return (
            <tr>
              <td className="text-right">{value.ID}</td>
              <td className="text-right">{value.Name}</td>
              <td className="text-right">{value.PhoneNumber}</td>
              <td className="text-left">{value.Address}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-primary mr-2 d-flex align-items-center btn-warning">
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
                  </button>
                  <button className="btn btn-outline-primary mr-2 d-flex align-items-center btn-danger">
                    <CIcon content={freeSet.cilDelete}></CIcon>
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default Suppliers;
