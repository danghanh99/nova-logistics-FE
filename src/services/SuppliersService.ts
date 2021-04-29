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

const newSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const response = await axios.post(API_URL + 'suppliers', {
    name: supplier.name,
    phone: supplier.phone,
    address: supplier.address,
    description: supplier.description,
  });
  return response.data.supplier;
};

const editSupplier = async (supplier: Supplier) => {
  const { name, phone, address, description } = supplier;
  const response = await axios.patch(`${API_URL}suppliers/${supplier.id}`, {
    name,
    phone,
    address,
    description,
  });
  if (response.data) return response.data;
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
