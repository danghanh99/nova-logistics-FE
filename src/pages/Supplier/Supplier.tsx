import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import data from './SuppliersData';
const Suppliers = (): JSX.Element => {
  const nameCol = ['ID', 'Phone Number', 'Address', 'Date', 'Mo ta'];

  const headers = (): any => {
    return nameCol.map((value, index) => {
      return <th scope="col">{value}</th>;
    });
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
              <td>{value.ID}</td>
              <td>{value.PhoneNumber}</td>
              <td className="text-center">{value.Address}</td>
              <td>{value.Date}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-primary mr-2 d-flex align-items-center">
                    {/* <CIcon content={freeSet.cilBrush}></CIcon> */}
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
