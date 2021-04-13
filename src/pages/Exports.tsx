import CIcon from '@coreui/icons-react';
import Table from '../components/Table/Table';
import data from './Suppliers/SuppliersData';
import { freeSet } from '@coreui/icons';
import Pagination from '../components/Pagination/Pagination';

const Exports = (): JSX.Element => {
  const nameCol = [
    'ID',
    'Product',
    'Customer',
    'Quantity ',
    'Price',
    'Date',
    'Note',
    'Action',
  ];

  const headers = (): JSX.Element => {
    return (
      <>
        {nameCol.map((value, index) => {
          return (
            <th key={index} style={{ textAlign: 'center' }} scope="col">
              {value}
            </th>
          );
        })}
      </>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {data.map((value, index) => {
          return (
            <tr key={index}>
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
      </>
    );
  };

  const pagination = () => {
    return <>{/* <Pagination /> */}</>;
  };

  return (
    <>
      {/* <Table
        headers={headers()}
        modelName="Export"
        children={children}
        pagination={pagination()}
      ></Table> */}
    </>
  );
};

export default Exports;
