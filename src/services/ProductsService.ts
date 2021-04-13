import axios from 'axios';
import { Hash } from 'crypto';
import Product from '../models/Product';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Product[];
  meta: Hash;
}
const getProducts = (): Promise<IState> => {
  return axios.get(API_URL + 'products').then((response) => {
    return response.data;
  });
};
const ProductsService = { getProducts };
export default ProductsService;
