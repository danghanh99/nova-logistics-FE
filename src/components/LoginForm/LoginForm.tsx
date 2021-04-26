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
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../services/AuthService';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedIn } from './LoginSlice';
import IState from '../../types/StateType';

interface IFormInputs {
  username: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state: IState) => state.isLoading);

  const onSubmit = () => {
    AuthService.Login(username, password).then(() => {
      history.push('/admin/exports');
      dispatch(isLoggedIn(true));
    });
  };

  const onHandleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onHandleChangeUserPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
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
          type="email"
          placeholder="Username"
          required
          autoComplete="username"
          {...register('username')}
          onChange={onHandleChangeUserName}
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
          required
          {...register('password')}
          onChange={onHandleChangeUserPassword}
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
            &nbsp;{!loading ? 'Login' : 'Loading...'}
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
