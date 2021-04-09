import { FaBox } from 'react-icons/fa';
import { BiImport, BiExport } from 'react-icons/bi';
import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Imports',
    to: '/admin/imports',
    icon: <BiImport className="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Exports',
    to: '/admin/exports',
    icon: <BiExport className="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    to: '/admin/products',
    icon: <FaBox className="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Suppliers',
    to: '/admin/suppliers',
    icon: (
      <CIcon content={freeSet.cilGroup} customClasses="c-sidebar-nav-icon" />
    ),
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    to: '/admin/customers',
    icon: (
      <CIcon content={freeSet.cilUser} customClasses="c-sidebar-nav-icon" />
    ),
  },
];

export default _nav;
