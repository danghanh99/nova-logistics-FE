import Inventory from './Inventory';
import Product from './Product';
import Supplier from './Supplier';
import User from './User';
class Import {
  id!: number;
  // user!: User;
  // inventory!: Inventory;
  product?: Product | null;
  supplier?: Supplier | null;
  quantity!: number;
  retail_price!: number;
  imported_date!: string;
  description!: string;
  // available_quantity!: number;
  // created_at!: Date;
}

export default Import;
