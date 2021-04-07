import Table from '../../components/Table/Table';
import data from './SuppliersData';
const Suppliers = (): JSX.Element => {
  const nameCol = ['ID', 'Phone Number', 'Address', 'Date', 'Mo ta'];
  return (
    <>
      <Table colTable={nameCol} data={data} modelName="Supplier" />
    </>
  );
};

export default Suppliers;
