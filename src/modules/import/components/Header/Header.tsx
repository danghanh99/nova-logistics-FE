import CIcon from '@coreui/icons-react';
import { cilArrowBottom, cilArrowTop } from '../../../../assets/icons';

interface IProps {
  onSort: (name: string, value: string) => void;
}
const Headers = (props: IProps) => {
  const { onSort } = props;
  return (
    <tr>
      <th className="width-50  text-right ">ID</th>
      <th>Product</th>
      <th>Supplier</th>
      <th>
        Quantity
        <i>
          <CIcon
            // className={iconSort.quantity_desc}
            content={cilArrowTop}
            onClick={(e) => onSort('quantity', 'desc')}
          />
          <CIcon
            // className={iconSort.quantity_asc}
            content={cilArrowBottom}
            onClick={(e) => onSort('quantity', 'asc')}
          />
        </i>
      </th>
      <th>
        Price
        <i>
          <CIcon
            // className={iconSort.retail_price_desc}
            content={cilArrowTop}
            onClick={(e) => onSort('retail_price', 'desc')}
          />
          <CIcon
            // className={iconSort.retail_price_asc}
            content={cilArrowBottom}
            onClick={(e) => onSort('retail_price', 'asc')}
          />
        </i>
      </th>
      <th>
        Import Date
        <i>
          <CIcon
            // className={iconSort.imported_date_desc}
            content={cilArrowTop}
            onClick={(e) => onSort('imported_date', 'desc')}
          ></CIcon>
          <CIcon
            // className={iconSort.imported_date_asc}
            content={cilArrowBottom}
            onClick={(e) => onSort('imported_date', 'asc')}
          ></CIcon>
        </i>
      </th>
      <th>Description</th>
      <th className="width-200">Action</th>
    </tr>
  );
};

export default Headers;
