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
  axios.interceptors.response.use((response) => {
    if (response.data) {
      dispatch(isLoading(false));
    }
    return response;
  });
};

export default AxiosInterceptors;
