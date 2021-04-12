import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import loginReducer from './components/LoginForm/LoginSlice';
import supplierReducer from './pages/Suppliers/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';
import importReducer from './pages/Imports/ImportsSlice';
import exportReducer from './pages/Exports/ExportsSlice';
import productReducer from './pages/Products/ProductSlice';
import showNewFormReducer from './pages/Suppliers/showNewFormSlice';
const rootReducer = {
  sidebar: sidebarReducer,
  suppliers: supplierReducer,
  customers: customerReducer,
  imports: importReducer,
  exports: exportReducer,
  products: productReducer,
  isLoggedIn: loginReducer,
  newSupplier: showNewFormReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
