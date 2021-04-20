import Exports from './pages/Exports/Exports';
import Imports from './pages/Imports/Imports';
import Products from './pages/Products/Products';
import { IRoute } from './types/RouteType';
import Suppliers from './pages/Suppliers/Suppliers';
import Customers from './pages/Customers/Customers';
import NewImport from './pages/Imports/NewImport';
import EditImport from './pages/Imports/EditImport';
import NewCustomer from './pages/Customers/NewCustomer';
import NewExport from './pages/Exports/NewExport';
import EditCustomer from './pages/Customers/EditCustomer';
const routes: IRoute[] = [
  {
    path: '/admin/imports',
    name: 'Imports',
    component: Imports,
    exact: true,
  },
  {
    path: '/admin/exports',
    name: 'Exports',
    component: Exports,
    exact: true,
  },
  {
    path: '/admin/products',
    name: 'Products',
    component: Products,
    exact: true,
  },
  {
    path: '/admin/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    exact: undefined,
  },
  {
    path: '/admin/customers',
    name: 'Customers',
    component: Customers,
    exact: true,
  },
  {
    path: '/admin/customers/new',
    name: 'New Customer',
    component: NewCustomer,
    exact: true,
  },
  {
    path: '/admin/imports/new',
    name: 'New Import',
    component: NewImport,
    exact: true,
  },
  {
    path: '/admin/exports/new',
    name: 'New Export',
    component: NewExport,
    exact: true,
  },
  {
    path: '/admin/imports/edit/:id',
    name: 'Edit Import',
    component: EditImport,
    exact: true,
  },
  {
    path: '/admin/customers/:id',
    name: 'Edit Customer',
    component: EditCustomer,
    exact: true,
  },
];

export default routes;
