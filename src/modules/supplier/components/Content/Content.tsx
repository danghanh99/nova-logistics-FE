import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import Supplier from '../../services/api/types/Supplier';
import { freeSet } from '@coreui/icons';
interface IProps {
  listSuppliers: Supplier[];
}

const Content = (props: IProps): JSX.Element => {
  const history = useHistory();
  const handleEdit = (id: number) => {
    history.push(`/admin/suppliers/${id}`);
  };

  return (
    <>
      {props.listSuppliers.map((value, index) => {
        return (
          <tr key={index}>
            <td className="text-right">{index + 1}</td>
            <td className="text-left">{value.name}</td>
            <td className="text-right">{value.phone}</td>
            <td className="text-left">{value.address}</td>
            <td className="text-left">{value.description}</td>
            <td>
              <div className="d-flex justify-content-center">
                <button
                  className="btn mr-2 d-flex align-items-center btn-warning"
                  onClick={() => handleEdit(value.id)}
                >
                  <CIcon content={freeSet.cilColorBorder}></CIcon>
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Content;
