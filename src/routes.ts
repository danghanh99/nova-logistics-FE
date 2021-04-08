import Exports from './pages/Exports';
import Imports from './pages/Imports';
import Products from './pages/Products/Products';
import { IRoute } from './types/RouteType';
import Suppliers from './pages/Suppliers/Suppliers';
import Customers from './pages/Customers/Customers';
const routes: IRoute[] = [
  {
    path: '/imports',
    name: 'Imports',
    component: Imports,
    exact: undefined,
  },
  {
    path: '/exports',
    name: 'Exports',
    component: Exports,
    exact: undefined,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    exact: undefined,
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    exact: undefined,
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
    exact: undefined,
  },
];

export default routes;
