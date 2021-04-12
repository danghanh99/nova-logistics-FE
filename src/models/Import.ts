import Product from './Product';
import Supplier from './Supplier';
class Import {
  id!: number;
  product!: Product;
  supplier!: Supplier;
  quantity!: number;
  retail_price!: number;
  imported_date!: Date;
  description!: string;
}

export default Import;
