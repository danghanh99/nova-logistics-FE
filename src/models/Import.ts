import Product from './Product';
import Supplier from './Supplier';
class Import {
  id!: number;
  product!: Product;
  supplier!: Supplier;
  quantity!: number;
  price!: number;
  date!: Date;
  note!: string;
}

export default Import;
