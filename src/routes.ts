import Dashboard from './pages/Dashboard';
import { IRoute } from './types/RouteType';

const routes: IRoute[] = [
  // { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    exact: undefined,
  },
];

export default routes;
