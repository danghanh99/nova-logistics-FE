import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { cilColorBorder } from '../../../../assets/icons';
import Product from '../../services/api/types/Product';

interface IProps {
  listProducts: Product[];
}

const Content = (props: IProps): JSX.Element => {
  const history = useHistory();
  return (
    <>
      {props.listProducts.map((value, index) => {
        return (
          <tr key={index}>
            <td className="text-right">{index + 1}</td>
            <td className="text-left">{value.name}</td>
            <td className="text-right">{value.total_quantity}</td>
            <td className="text-right">{value.total_available_quantity}</td>
            <td className="text-left">{value.description}</td>
            <td>
              <div className="d-flex justify-content-center">
                <button
                  className="btn mr-2 d-flex align-items-center btn-warning"
                  onClick={() =>
                    history.push(`/admin/products/edit/${value.id}`)
                  }
                >
                  <CIcon content={cilColorBorder}></CIcon>
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
