import axios from 'axios';
import { Hash } from 'crypto';
import ISupplier from '../types/SupplierType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: ISupplier[];
  meta: Hash;
}
const getSuppliers = (search?: string): Promise<IState> => {
  return axios
    .get(API_URL + 'suppliers', {
      params: { name: search },
    })
    .then((response) => {
      return response.data;
    });
};

const SuppliersService = { getSuppliers };
export default SuppliersService;
