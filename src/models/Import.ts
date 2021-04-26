import Product from './Product';
import Supplier from './Supplier';
class Import {
  id!: number;
  product?: Product | null;
  supplier?: Supplier | null;
  quantity!: number;
  retail_price!: number;
  imported_date!: string;
  description!: string;
}

export default Import;
