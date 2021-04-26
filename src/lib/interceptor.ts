import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isLoading } from '../LoadingSlice';
import { useSnackbar } from 'notistack';

const AxiosInterceptors = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  axios.interceptors.request.use((request) => {
    if (request) {
      dispatch(isLoading(true));
    }
    return request;
  });
  axios.interceptors.response.use(
    (response) => {
      if (response.data) {
        dispatch(isLoading(false));
      }
      return response;
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      enqueueSnackbar(resMessage, { variant: 'error' });
    }
  );
};

export default AxiosInterceptors;
