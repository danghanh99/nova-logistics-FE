import {
  CButton,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

const LoginForm = (): JSX.Element => {
  return (
    <CForm>
      <h1>Login</h1>
      <p className="text-muted">Sign In to your account</p>
      {/* {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )} */}
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon content={freeSet.cilUser} />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          type="text"
          placeholder="Username"
          autoComplete="username"
          name="username"
          // value={username}
          // onChange={onChangeUsername}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon content={freeSet.cilLockLocked} />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          name="password"
          // value={password}
          // onChange={onChangePassword}
        />
      </CInputGroup>
      <CRow>
        <CCol xs="6">
          <CButton
            color="primary"
            className="px-4"
            // disabled={loading}
            type="submit"
          >
            {/* {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )} */}
            Login
          </CButton>
        </CCol>
        <CCol xs="6" className="text-right">
          <CButton color="link" className="px-0">
            Forgot password?
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default LoginForm;
