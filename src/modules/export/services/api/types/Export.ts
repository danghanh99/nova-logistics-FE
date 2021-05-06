import Customer from '../../../../customer/services/api/types/Customer';
import Import from '../../../../import/services/api/types/Import';

class Export {
  id!: number;
  sell_price!: number;
  quantity!: number;
  exported_date!: string;

  imports!: Import[];
  customer?: Customer | null;
  description!: string;
}

export default Export;
