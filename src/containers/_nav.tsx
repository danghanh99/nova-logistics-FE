import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: (
      <CIcon
        content={freeSet.cilSpeedometer}
        customClasses="c-sidebar-nav-icon"
      />
    ),
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/colors',
    icon: (
      <CIcon content={freeSet.cilDrop} customClasses="c-sidebar-nav-icon" />
    ),
  },
];

export default _nav;
