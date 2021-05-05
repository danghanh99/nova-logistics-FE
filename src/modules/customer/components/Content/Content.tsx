import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { freeSet } from '@coreui/icons';
import Customer from '../../services/api/types/Customer';
interface IProps {
  listCustomers: Customer[];
}

const Content = (props: IProps): JSX.Element => {
  const history = useHistory();
  const handleEdit = (id: number) => {
    history.push(`/admin/customers/${id}`);
  };

  return (
    <>
      {props.listCustomers.map((value, index) => {
        return (
          <tr key={index}>
            <td className="text-right">{index + 1}</td>
            <td className="text-left">{value.name}</td>
            <td className="text-right">{value.phone_number}</td>
            <td className="text-left">{value.address}</td>
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
