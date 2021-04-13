import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { isLoggedIn } from '../components/LoginForm/LoginSlice';
import AuthService from '../services/AuthService';

const TheHeaderDropdown = () => {
  const onLogout = () => {
    isLoggedIn(false);
    AuthService.logout();
    window.location.href = '/';
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon content={freeSet.cilPeople} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={onLogout}>
          <CIcon content={freeSet.cilExitToApp} className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
