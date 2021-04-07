import { FaBox } from 'react-icons/fa';
import { BiImport, BiExport } from 'react-icons/bi';
import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Supplier',
    to: '/suppliers',
    icon: (
      <CIcon content={freeSet.cilGroup} customClasses="c-sidebar-nav-icon" />
    ),
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Import',
    to: '/imports',
    icon: <BiImport className="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Exports',
    to: '/exports',
    icon: <BiExport className="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    to: '/products',
    icon: <FaBox className="c-sidebar-nav-icon" />,
  },
];

export default _nav;
