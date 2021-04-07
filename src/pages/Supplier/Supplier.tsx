import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import data from './SuppliersData';
import { freeSet } from '@coreui/icons';
import './supplier.css';
const Suppliers = (): JSX.Element => {
  const nameCol = ['ID', 'Phone Number', 'Address', 'Date', 'Action'];

  const headers = (): any => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    );
  };

  return (
    <>
      <Table
        colTable={nameCol}
        data={data}
        headers={headers()}
        modelName="Supplier"
      >
        {data.map((value, index) => {
          return (
            <tr>
              <td className="text-right">{value.ID}</td>
              <td className="text-right">{value.PhoneNumber}</td>
              <td className="text-left">{value.Address}</td>
              <td className="text-right">{value.Date}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-primary mr-2 d-flex align-items-center">
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
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
