import axios from 'axios';
import Supplier from '../models/Supplier';
import IMeta from '../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Supplier[];
  meta: IMeta;
}

const getSuppliers = (
  page?: number,
  perPage?: number,
  search?: string,
  sort?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'suppliers', {
      params: { page, per_page: perPage, name: search, sort },
    })
    .then((response) => {
      return response.data;
    });
};

const newSupplier = (supplier: Supplier): Promise<Supplier> => {
  return axios
    .post(API_URL + 'suppliers', {
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address,
      description: supplier.description,
    })
    .then((response) => {
      return response.data.supplier;
    });
};

const editSupplier = (supplier: Supplier) => {
  const { name, phone, address, description } = supplier;
  const response = axios.patch(`${API_URL}suppliers/${supplier.id}`, {
    name,
    phone,
    address,
    description,
  });
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const getSupplier = (id: number) => {
  const response = axios.get(`${API_URL}suppliers/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const SuppliersService = {
  getSuppliers,
  getSupplier,
  editSupplier,
  newSupplier,
};
export default SuppliersService;
