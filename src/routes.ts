import Exports from './pages/Exports/Exports';
import Imports from './pages/Imports/Imports';
import Products from './pages/Products/Products';
import { IRoute } from './types/RouteType';
import Suppliers from './pages/Suppliers/Suppliers';
import Customers from './pages/Customers/Customers';
import NewImport from './pages/Imports/NewImport';
import {} from 'module';
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
    path: '/admin/imports/new',
    name: 'New Import',
    component: NewImport,
    exact: true,
  },
];

export default routes;
