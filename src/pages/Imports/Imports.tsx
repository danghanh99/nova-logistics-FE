import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import { BiImport, BiExport } from 'react-icons/bi';

export interface IState {
  imports: Import[];
}

const Imports = (): JSX.Element => {
  const listImports = plainToClass(
    Import,
    useSelector((state: IState) => state.imports)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    ImportsService.getImports()
      .then((res) => {
        dispatch(getImports(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const headers = (): JSX.Element => {
    return (
      <tr>
        <th style={{ width: '50px', textAlign: 'right' }}>ID</th>
        <th>Product</th>
        <th>Supplier</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Import Date</th>
        <th>Description</th>
        <th style={{ width: '200px' }}>Action</th>
      </tr>
    );
  };

  const children = (): React.ReactNode => {
    return (
      <>
        {listImports.map((value, index) => {
          return (
            <tr key={index}>
              <td className="text-right">{index + 1}</td>
              <td className="text-left">{value.product.name}</td>
              <td className="text-left">{value.supplier.name}</td>
              <td className="text-right">{value.quantity}</td>
              <td className="text-right">{value.retail_price}</td>
              <td className="text-right">{value.imported_date}</td>
              <td className="text-left">{value.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn mr-2 d-flex align-items-center btn-success">
                    <BiExport className="c-icon" />
                  </button>
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
      <Table
        headers={headers()}
        modelName="Import"
        children={children()}
      ></Table>
    </>
  );
};

export default Imports;
