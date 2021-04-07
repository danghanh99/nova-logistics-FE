import { Exports } from './pages/Exports';
import { Imports } from './pages/Imports';
import Products from './pages/Products/Products';
import { IRoute } from './types/RouteType';
import Supplier from './pages/Supplier/Supplier';
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
    name: 'Supplier',
    component: Supplier,
    exact: undefined,
  },
];

export default routes;
