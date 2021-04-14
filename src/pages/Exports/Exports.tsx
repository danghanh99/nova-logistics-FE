import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import data from './../Suppliers/SuppliersData';
import { freeSet } from '@coreui/icons';
import Export from '../../models/Export';
import { plainToClass } from 'class-transformer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ExportsService from '../../services/ExportsService';
import { getExports } from './ExportsSlice';
import Pagination from '../../components/Pagination/Pagination';
export interface IState {
  exports: Export[];
}

const Exports = (): JSX.Element => {
  const listExports = plainToClass(
    Export,
    useSelector((state: IState) => state.exports)
  );

  const nameCol = [
    'Product',
    'Customer',
    'Quantity ',
    'Price',
    'Export Date',
    'Description',
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    ExportsService.getExports()
      .then((res) => {
        dispatch(getExports(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const headers = (): JSX.Element => {
    return (
      <>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        {nameCol.map((value, index) => {
          return (
            <th key={index} className="text-center" scope="col">
              {value}
            </th>
          );
        })}
        <th style={{ width: '200px' }}>Action</th>
      </>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listExports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.imports[0].product.name}</td>
              <td className="text-left">{value.customer.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.sell_price}</td>
              <td className="text-right">{value.exported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-danger">
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

  const pagination = () => {
    return <>{/* <Pagination /> */}</>;
  };

  return (
    <>
      {/* <Table
        headers={headers()}
        modelName="Export"
        children={children()}
        pagination={pagination()}
      ></Table> */}
    </>
  );
};

export default Exports;
