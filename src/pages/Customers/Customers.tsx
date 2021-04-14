import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import './Customers.css';
import Customer from '../../models/Customer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { plainToClass } from 'class-transformer';
import { getCustomers } from './CustomersSlice';
import CutomersService from '../../services/CutomersService';
import Pagination from '../../components/Pagination/Pagination';
export interface IState {
  customers: Customer[];
}

const Customers = (): JSX.Element => {
  const listCustomers = plainToClass(
    Customer,
    useSelector((state: IState) => state.customers)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    CutomersService.getCustomers()
      .then((res) => {
        dispatch(getCustomers(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const headers = (): JSX.Element => {
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

  const children = (): React.ReactNode => {
    return (
      <>
        {listCustomers.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-right">{value.name}</td>
              <td className="text-right">{value.phone_number}</td>
              <td className="text-left">{value.address}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-warning">
                    <CIcon content={freeSet.cilColorBorder}></CIcon>
                  </button>
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
        modelName="Customer"
        children={children()}
        pagination={pagination()}
      ></Table> */}
    </>
  );
};

export default Customers;
