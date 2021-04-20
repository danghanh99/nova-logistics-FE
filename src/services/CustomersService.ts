import axios from 'axios';
import Customer from '../models/Customer';
import ICustomer from '../models/Customer';
import IMeta from '../types/MetaType';

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
      params: { page, per_page: perPage, product_name: search, sort },
    })
    .then((response) => {
      return response.data;
    });
};

const newCustomer = (customer: Customer): Promise<Customer> => {
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

const CustomersService = { getCustomers, newCustomer };
export default CustomersService;
