import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

type Props = {
  onSort: (e: React.MouseEvent, name: string, value: string) => void;
  iconSort: {
    quantity_desc: string;
    quantity_asc: string;
    retail_price_desc: string;
    retail_price_asc: string;
    imported_date_desc: string;
    imported_date_asc: string;
  };
};

const headers = (props: Props): JSX.Element => {
  const { onSort, iconSort } = props;
  return (
    <tr>
      <th className="width-50  text-right ">ID</th>
      <th>Product</th>
      <th>Supplier</th>
      <th>
        Quantity
        <i>
          <CIcon
            className={iconSort.quantity_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'quantity', 'desc')}
          />
          <CIcon
            className={iconSort.quantity_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'quantity', 'asc')}
          />
        </i>
      </th>
      <th>
        Price
        <i>
          <CIcon
            className={iconSort.retail_price_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'retail_price', 'desc')}
          />
          <CIcon
            className={iconSort.retail_price_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'retail_price', 'asc')}
          />
        </i>
      </th>
      <th>
        Import Date
        <i>
          <CIcon
            className={iconSort.imported_date_desc}
            content={freeSet.cilArrowTop}
            onClick={(e) => onSort(e, 'imported_date', 'desc')}
          ></CIcon>
          <CIcon
            className={iconSort.imported_date_asc}
            content={freeSet.cilArrowBottom}
            onClick={(e) => onSort(e, 'imported_date', 'asc')}
          ></CIcon>
        </i>
      </th>
      <th>Description</th>
      <th className="width-200">Action</th>
    </tr>
  );
};

export default headers;
