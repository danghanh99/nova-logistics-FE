import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import supplierReducer from './pages/Suppliers/SuppliersSlice';
import customerReducer from './pages/Customers/CustomersSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  suppliers: supplierReducer,
  customers: customerReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
