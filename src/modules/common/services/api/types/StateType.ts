import Customer from '../../../../../models/Customer';
import Export from '../../../../../models/Export';
import Import from '../../../../../models/Import';
import Product from '../../../../../models/Product';
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
