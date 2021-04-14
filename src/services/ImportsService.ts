import axios from 'axios';
import Import from '../models/Import';
import IMeta from '../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Import[];
  meta: IMeta;
}
const getImports = (
  page?: number,
  perPage?: number,
  search?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'imports', {
      params: { page, per_page: perPage, product_name: search },
    })
    .then((response) => {
      return response.data;
    });
};

const deleteImport = (id: number) => {
  const response = axios.delete(`${API_URL}imports/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const ImportsService = { getImports, deleteImport };
export default ImportsService;
