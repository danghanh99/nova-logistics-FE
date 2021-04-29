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
import { isLoading } from '../../LoadingSlice';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .email('email invalid')
    .required('username must be exist'),
  password: yup.string().required('password must be exist'),
});

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state: IState) => state.isLoading);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = () => {
    AuthService.Login(username, password)
      .then(() => {
        history.push('/admin/exports');
        dispatch(isLoggedIn(true));
      })
      .catch((error) => {
        dispatch(isLoading(false));
        enqueueSnackbar(error, { variant: 'error' });
        return error;
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

  useEffect(() => {
    setValue('username', username);
    setValue('password', password);
  }, [username, password, setValue]);

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
          {...register('username')}
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={onHandleChangeUserName}
        />
        <div>
          <p>{errors.username?.message}</p>
        </div>
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
          value={password}
          {...register('password')}
          onChange={onHandleChangeUserPassword}
        />
        <p>{errors.password?.message}</p>
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
