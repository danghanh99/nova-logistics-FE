import axios from 'axios';
import jwt_decode from 'jwt-decode';
const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1';

const Login = async (email: string, password: string) => {
  return await axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
      return response.data;
    });
};

type Token = {
  user_id: number;
  exp: number;
};

const isExpired = (): boolean => {
  const token = localStorage.getItem('token') || '';
  const decodedToken: Token = jwt_decode(token);
  const currentDate = new Date();

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false;
  } else {
    return true;
  }
};

const setAuthToken = (token: string): void => {
  axios.defaults.headers.common[`Authorization`] = '';
  delete axios.defaults.headers.common[`Authorization`];

  if (token) {
    axios.defaults.headers.common[`Authorization`] = `${token}`;
  }
};

export default {
  Login,
  isExpired,
};
