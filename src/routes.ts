import Exports from './pages/Exports';
import Imports from './pages/Imports';
import Products from './pages/Products/Products';
import { IRoute } from './types/RouteType';
import Suppliers from './pages/Suppliers/Suppliers';
import Customers from './pages/Customers/Customers';
const routes: IRoute[] = [
  {
    path: '/admin/imports',
    name: 'Imports',
    component: Imports,
    exact: undefined,
  },
  {
    path: '/admin/exports',
    name: 'Exports',
    component: Exports,
  },
  {
    path: '/admin/products',
    name: 'Products',
    component: Products,
    exact: undefined,
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
    exact: undefined,
  },
];

export default routes;
