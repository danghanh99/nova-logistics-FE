import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import './Suppliers.css';
import ISupplier from '../../models/Supplier';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SuppliersService from '../../services/SuppliersService';
import { getSuppliers } from './SuppliersSlice';
import { plainToClass } from 'class-transformer';
export interface IState {
  suppliers: ISupplier[];
  newSupplier: boolean;
}

const Suppliers = (): JSX.Element => {
  const listSuppliers = plainToClass(
    ISupplier,
    useSelector((state: IState) => state.suppliers)
  );
  const showForm = useSelector((state: IState) => state.newSupplier);
  const dispatch = useDispatch();

  useEffect(() => {
    SuppliersService.getSuppliers()
      .then((res) => {
        dispatch(getSuppliers(res.data));
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
        <th>Description</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listSuppliers.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.name}</td>
              <td className="text-right">{value.phone}</td>
              <td className="text-left">{value.address}</td>
              <td className="text-left">{value.description}</td>
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

  return (
    <>
      {showForm && (
        <form>
          <label htmlFor="fname">First name:</label>
          <br />
          <input type="text" id="fname" name="fname" />
          <br />
          <label htmlFor="lname">Last name:</label>
          <br />
          <input type="text" id="lname" name="lname" />
          <button className="btn-success">Submit</button>
          <button className="btn-warning">Cancel</button>
        </form>
      )}
      <Table
        headers={headers()}
        modelName="Supplier"
        children={children()}
      ></Table>
    </>
  );
};

export default Suppliers;
