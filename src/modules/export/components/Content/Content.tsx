import CIcon from '@coreui/icons-react';
import { cilTrash } from '../../../../assets/icons';
import Export from '../../services/api/types/Export';

interface IProps {
  listExports: Export[];
  onHandleDelete: (id: number) => void;
}

const Content = (props: IProps): JSX.Element => {
  return (
    <>
      {props.listExports.map((value, index) => {
        return (
          <tr key={index}>
            <td className="text-right">{index + 1}</td>
            <td className="text-left">{value.imports[0].product?.name}</td>
            <td className="text-left">{value.customer?.name}</td>
            <td className="text-right">{value.quantity}</td>
            <td className="text-right">{value.sell_price}</td>
            <td className="text-right">{value.exported_date}</td>
            <td className="text-left">{value.description}</td>
            <td>
              <div className="d-flex justify-content-center">
                <button
                  className="btn mr-2 d-flex align-items-center btn-danger"
                  onClick={() => props.onHandleDelete(value.id)}
                >
                  <CIcon content={cilTrash}></CIcon>
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
