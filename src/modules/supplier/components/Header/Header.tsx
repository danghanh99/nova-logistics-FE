import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import IIcons from '../../../common/services/api/types/IconType';
interface IProps {
  onSort: (name: string, value: string) => void;
  iconSort: IIcons;
}
const Headers = (props: IProps) => {
  const { onSort } = props;

  return (
    <tr>
      <th className="width-50  text-right ">ID</th>
      <th>
        Name
        <CIcon
          className={`${props.iconSort.name_desc} cursor`}
          content={freeSet.cilArrowTop}
          onClick={(e) => onSort('name', 'desc')}
        />
        <CIcon
          className={`${props.iconSort.name_asc} cursor`}
          content={freeSet.cilArrowBottom}
          onClick={(e) => onSort('name', 'asc')}
        />
      </th>
      <th>
        Phone Number{' '}
        <CIcon
          className={`${props.iconSort.phone_desc} cursor`}
          content={freeSet.cilArrowTop}
          onClick={(e) => onSort('phone', 'desc')}
        />
        <CIcon
          className={`${props.iconSort.phone_asc} cursor`}
          content={freeSet.cilArrowBottom}
          onClick={(e) => onSort('phone', 'asc')}
        />
      </th>
      <th>
        Address{' '}
        <CIcon
          className={`${props.iconSort.address_desc} cursor`}
          content={freeSet.cilArrowTop}
          onClick={(e) => onSort('address', 'desc')}
        />
        <CIcon
          className={`${props.iconSort.address_asc} cursor`}
          content={freeSet.cilArrowBottom}
          onClick={(e) => onSort('address', 'asc')}
        />
      </th>
      <th>Description</th>
      <th className="width-200">Action</th>
    </tr>
  );
};

export default Headers;
