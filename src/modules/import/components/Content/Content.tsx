import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilTrash } from '../../../../assets/icons';
import Import from '../../../../models/Import';

interface IProps {
  listImports: Import[];
}

const Content = (props: IProps): JSX.Element => {
  return (
    <>
      {props.listImports.map((value, index) => {
        return (
          <tr key={index}>
            <td className="text-right">{index + 1}</td>
            <td className="text-left">{value.product?.name}</td>
            <td className="text-left">{value.supplier?.name}</td>
            <td className="text-right">{value.quantity}</td>
            <td className="text-right">{value.retail_price}</td>
            <td className="text-right">{value.imported_date}</td>
            <td className="text-left">{value.description}</td>
            <td>
              <div className="d-flex justify-content-center">
                <button
                  className="btn mr-2 d-flex align-items-center btn-warning"
                  //   onClick={() =>
                  //     // history.push(`/admin/imports/edit/${value.id}`)
                  //   }
                >
                  <CIcon content={cilColorBorder}></CIcon>
                </button>
                <button
                  className="btn mr-2 d-flex align-items-center btn-danger"
                  //   onClick={() => onHandleDelete(value.id)}
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
