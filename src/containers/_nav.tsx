import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: (
      <CIcon content={freeSet.cilTruck} customClasses="c-sidebar-nav-icon" />
    ),
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Supplier',
    to: '/suppliers',
    icon: (
      <CIcon content={freeSet.cilGroup} customClasses="c-sidebar-nav-icon" />
    ),
  },
];

export default _nav;
