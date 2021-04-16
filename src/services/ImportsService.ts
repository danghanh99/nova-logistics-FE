import axios from 'axios';
import Import from '../models/Import';
import IMeta from '../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Import[];
  meta: IMeta;
}

interface IFormValues {
  product_id: number;
  supplier_id: number;
  import_date: string;
  quantity: number;
  price: number;
  description: string;
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

const newImport = (formValues?: IFormValues): Promise<Import> => {
  return axios
    .post(API_URL + 'imports', {
      product_id: formValues?.product_id,
      supplier_id: formValues?.supplier_id,
      imported_date: formValues?.import_date,
      quantity: formValues?.quantity,
      retail_price: formValues?.price,
      description: formValues?.description,
    })
    .then((response) => {
      return response.data.import;
    });
};

const deleteImport = (id: number) => {
  const response = axios.delete(`${API_URL}imports/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const ImportsService = { getImports, deleteImport, newImport };
export default ImportsService;
