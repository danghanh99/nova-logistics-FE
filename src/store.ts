import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import supplierReducer from './pages/Suppliers/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';
import importReducer from './pages/Imports/ImportsSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  suppliers: supplierReducer,
  customers: customerReducer,
  imports: importReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
