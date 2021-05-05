import axios from 'axios';
import Product from '../../../../models/Product';
import IMeta from '../../../../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Product[];
  meta: IMeta;
}
const getProducts = (
  search?: string,
  page?: number,
  perPage?: number,
  sort?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'products', {
      params: { name: search, page, per_page: perPage, sort },
    })
    .then((response) => {
      return response.data;
    });
};

const createProduct = (name: string, description: string) => {
  const response = axios.post(`${API_URL}products`, {
    name,
    description,
  });
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const getDetailProduct = (id: number) => {
  const response = axios.get(`${API_URL}products/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const updateProduct = async (newProduct: Product) => {
  const { name, description } = newProduct;
  const response = await axios.patch(`${API_URL}products/${newProduct.id}`, {
    name,
    description,
  });
  if (response.data) return response.data;
  return response;
};
const ProductsService = {
  getProducts,
  updateProduct,
  createProduct,
  getDetailProduct,
};
export default ProductsService;
