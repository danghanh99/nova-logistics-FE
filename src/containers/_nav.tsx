import { FaBox } from 'react-icons/fa';
import { BiImport, BiExport } from 'react-icons/bi';

const _nav = [
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
