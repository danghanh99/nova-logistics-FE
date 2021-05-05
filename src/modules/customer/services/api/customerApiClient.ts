import axios from 'axios';
import IMeta from '../../../common/services/api/types/MetaType';
import ICustomer from '../api/types/Customer';
import Customer from './types/Customer';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: ICustomer[];
  meta: IMeta;
}

const getCustomers = (
  page?: number,
  perPage?: number,
  search?: string,
  sort?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'customers', {
      params: { page, per_page: perPage, name: search, sort },
    })
    .then((response) => {
      return response.data;
    });
};

const newCustomer = async (customer: Customer): Promise<Customer> => {
  return axios
    .post(API_URL + 'customers', {
      name: customer.name,
      phone_number: customer.phone_number,
      address: customer.address,
    })
    .then((response) => {
      return response.data.customer;
    });
};

const editCustomer = async (customer: Customer) => {
  const { name, phone_number, address } = customer;
  const response = await axios.patch(`${API_URL}customers/${customer.id}`, {
    name,
    phone_number,
    address,
  });
  if (response.data) return response.data;
  return response;
};

const getCustomer = (id: number) => {
  const response = axios.get(`${API_URL}customers/${id}`);
  response.then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

const CustomersService = {
  getCustomers,
  newCustomer,
  editCustomer,
  getCustomer,
};
export default CustomersService;
