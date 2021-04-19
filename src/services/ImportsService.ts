import axios from 'axios';
import Import from '../models/Import';
import IMeta from '../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Import[];
  meta: IMeta;
}

interface IFormValues {
  product: number;
  supplier: number;
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

const newImport = (Import: Import): Promise<Import> => {
  return axios
    .post(API_URL + 'imports', {
      product_id: Import.product?.id,
      supplier_id: Import.supplier?.id,
      imported_date: Import.imported_date,
      quantity: Import.quantity,
      retail_price: Import.retail_price,
      description: Import?.description,
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

const ImportsService = {
  getImports,
  deleteImport,
  getImport,
  updateImport,
  newImport,
};
export default ImportsService;
