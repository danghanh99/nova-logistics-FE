import axios from 'axios';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1';

const Login = (email: string, password: string) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    });
};

export const isLoggedIn = (): boolean => {
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  } else {
    return false;
  }
};

export default {
  Login,
  isLoggedIn,
};
