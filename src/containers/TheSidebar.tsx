import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarMinimizer,
  CSidebarNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import navigation from './_nav';
import { freeSet } from '@coreui/icons';
import { sidebarStatus } from './SidebarSlice';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.sidebar);

  return (
    <CSidebar
      show={show}
      onShowChange={(val: any) => dispatch(sidebarStatus(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          content={freeSet.cilHome}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavItem,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
