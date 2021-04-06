import React from 'react';
import { createStore, combineReducers } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';
import store from '../store';
import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';

const TheSidebar = () => {
  // const rootReducer = combineReducers({
  //   content: dataReducer,
  // });

  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.sidebarShow);
  // const store = createStore(rootReducer);
  return (
    <CSidebar
      show={show}
      onShowChange={(val: any) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
