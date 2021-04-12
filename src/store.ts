import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import loginReducer from './components/LoginForm/LoginSlice';
import supplierReducer from './pages/Suppliers/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';
import importReducer from './pages/Imports/ImportsSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  suppliers: supplierReducer,
  customers: customerReducer,
  imports: importReducer,
  isLoggedIn: loginReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
