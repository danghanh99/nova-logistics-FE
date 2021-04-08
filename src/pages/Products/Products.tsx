import Table from '../../components/Table/Table';
import data from '../Suppliers/SuppliersData';
const Products = (): JSX.Element => {
  const nameCol = ['ID', 'Phone Number', 'Address', 'Date', 'Action'];
  return (
    <>{/* <Table colTable={nameCol} data={data} modelName="Product" /> */}</>
  );
};

export default Products;
