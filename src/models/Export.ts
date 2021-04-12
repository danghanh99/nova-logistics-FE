import Product from './Product';
import Supplier from './Supplier';
import Import from './Import';
import Customer from './Customer';
import User from './User';
import Inventory from './Inventory';

class Export {
  id!: number;
  sell_price!: number;
  quantity!: number;
  exported_date!: Date;

  imports!: Import[];
  customer!: Customer;
  user!: User;
  inventory!: Inventory;

  description!: string;
}

export default Export;
