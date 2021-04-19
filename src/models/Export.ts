import Import from './Import';
import Customer from './Customer';
import User from './User';
import Inventory from './Inventory';

class Export {
  id!: number;
  sell_price!: number;
  quantity!: number;
  exported_date!: string;

  imports!: Import[];
  customer?: Customer | null;
  user?: User;
  inventory?: Inventory;

  description!: string;
}

export default Export;
