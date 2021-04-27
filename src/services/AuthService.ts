import axios from 'axios';
import jwt_decode from 'jwt-decode';

type Token = {
  user_id: number;
  exp: number;
};

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1';

const Login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', response.data.user);
    setAuthToken();
    return response.data;
  }
  return response;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isExpired = (): boolean => {
  const token = localStorage.getItem('token') || '';
  const decodedToken: Token = jwt_decode(token);
  const currentDate = new Date();
  return decodedToken.exp * 1000 < currentDate.getTime() ? false : true;
};

export const setAuthToken = (): void => {
  const token = localStorage.getItem('token') || '';
  axios.defaults.headers.common[`Authorization`] = `${token}`;
};

const AuthService = {
  Login,
  isExpired,
  logout,
};
export default AuthService;
