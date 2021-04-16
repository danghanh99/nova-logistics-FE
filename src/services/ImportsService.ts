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
  search?: string,
  sort?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'imports', {
      params: { page, per_page: perPage, product_name: search, sort },
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

const getImport = (id: number) => {
  const response = axios.get(`${API_URL}imports/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const updateImport = (newImport: Import) => {
  const {
    retail_price,
    quantity,
    imported_date,
    description,
    supplier,
    product,
  } = newImport;
  const response = axios.patch(`${API_URL}imports/${newImport.id}`, {
    supplier_id: supplier?.id,
    product_id: product?.id,
    retail_price,
    quantity,
    imported_date,
    description,
  });
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const ImportsService = { getImports, deleteImport, getImport, updateImport };
export default ImportsService;
