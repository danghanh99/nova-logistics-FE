import Customer from '../../../../customer/services/api/types/Customer';
import Export from '../../../../export/services/api/types/Export';
import Import from '../../../../import/services/api/types/Import';
import Product from '../../../../product/services/api/types/Product';
import Supplier from '../../../../supplier/services/api/types/Supplier';
import IMeta from './MetaType';

interface IState {
  sidebar: boolean;
  suppliers: {
    data: Supplier[];
    meta: IMeta;
  };
  customers: {
    data: Customer[];
    meta: IMeta;
  };
  imports: {
    data: Import[];
    meta: IMeta;
  };
  exports: {
    data: Export[];
    meta: IMeta;
  };
  products: {
    data: Product[];
    meta: IMeta;
  };
  isLoggedIn: boolean;
  isLoading: boolean;
  newSupplier: boolean;
}

export default IState;
