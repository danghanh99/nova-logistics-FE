import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isLoading } from '../LoadingSlice';

const AxiosInterceptors = () => {
  const dispatch = useDispatch();
  axios.interceptors.request.use((request) => {
    if (request) {
      dispatch(isLoading(true));
    }
    return request;
  });
  axios.interceptors.response.use(
    (response) => {
      if (response.data || response.status === 204) {
        dispatch(isLoading(false));
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );
};

export default AxiosInterceptors;
