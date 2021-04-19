import {
  CButton,
  CCol,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
interface IFormInputs {
  username: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (data: IFormInputs) => {
    setLoading(true);
    try {
      AuthService.Login(data.username, data.password).then(
        () => {
          history.push('/admin/exports');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          enqueueSnackbar(resMessage, { variant: 'error' });
        }
      );
      dispatch(true);
    } catch (error) {
      return error;
    }
  };
  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <p className="text-muted">Sign In to your account</p>
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon content={freeSet.cilUser} />
          </CInputGroupText>
        </CInputGroupPrepend>
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          {...register('username', { required: true })}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon content={freeSet.cilLockLocked} />
          </CInputGroupText>
        </CInputGroupPrepend>
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register('password', { required: true })}
        />
      </CInputGroup>
      <CRow>
        <CCol xs="6">
          <CButton
            color="primary"
            className="px-4"
            disabled={loading}
            type="submit"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
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
