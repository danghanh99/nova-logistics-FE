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

// const deleteCustomer = (id: number) => {
//   const response = axios.delete(`${API_URL}customers/${id}`);
//   console.log(response);

//   response.then((res) => {
//     if (res.data) return res.data;
//   });
//   return response;
// };

const editCustomer = (customer: Customer) => {
  const { name, phone_number, address } = customer;
  const response = axios.patch(`${API_URL}customers/${customer.id}`, {
    name,
    phone_number,
    address,
  });
  response.then((res) => {
    if (res.data) return res.data;
  });
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
