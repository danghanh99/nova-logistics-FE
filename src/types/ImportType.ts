import Product from './ProductType';
import Supplier from './SupplierType';
interface IImport {
  ID: number;
  Product: Product;
  Supplier: Supplier;
  Quantity: number;
  Price: number;
  Date: Date;
  Note: string;
}

export default IImport;
