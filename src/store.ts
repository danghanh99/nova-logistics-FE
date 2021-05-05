import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import loginReducer from './components/LoginForm/LoginSlice';
import supplierReducer from './modules/supplier/services/state/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';
import importReducer from './modules/import/services/state/importsSlice';
import exportReducer from './pages/Exports/ExportsSlice';
import productReducer from './pages/Products/ProductSlice';
import loadingReducer from './LoadingSlice';
const rootReducer = {
  sidebar: sidebarReducer,
  suppliers: supplierReducer,
  customers: customerReducer,
  imports: importReducer,
  exports: exportReducer,
  products: productReducer,
  isLoggedIn: loginReducer,
  isLoading: loadingReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
