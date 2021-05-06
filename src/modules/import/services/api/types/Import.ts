import Product from '../../../../product/services/api/types/Product';
import Supplier from '../../../../supplier/services/api/types/Supplier';
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
