import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import loginReducer from './components/LoginForm/LoginSlice';
import supplierReducer from './pages/Suppliers/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';
import importReducer from './modules/import/services/state/ImportsSlice';
import exportReducer from './modules/export/services/state/ExportsSlice';
import productReducer from './modules/product/services/state/ProductSlice';
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
