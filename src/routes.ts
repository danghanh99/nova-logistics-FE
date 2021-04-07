import Dashboard from './pages/Dashboard';
import { IRoute } from './types/RouteType';
import Supplier from './pages/Supplier/Supplier';
const routes: IRoute[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
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
