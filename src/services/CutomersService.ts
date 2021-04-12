import axios from 'axios';
import { Hash } from 'crypto';
import ICustomer from '../models/Customer';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: ICustomer[];
  meta: Hash;
}
const getCustomers = (): Promise<IState> => {
  return axios
    .get(API_URL + 'customers', {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTgyNzgxMjN9.ljaF3Q1VEGUlKLOT5vClCDMY-2n2jhqfmZNKLa6t1QU',
      },
    })
    .then((response) => {
      return response.data;
    });
};

// const addTodo = (title: string, done: boolean): Promise<ITodo> => {
//   return axios
//     .post(API_URL + 'todos', {
//       title,
//       done,
//     })
//     .then((response) => response.data);
// };

// const deleteTodo = (id: number): Promise<ITodo> => {
//   return axios
//     .delete(`${API_URL}todos/${id}`)
//     .then((response) => response.data);
// };

// const doneTodo = (id: number): Promise<ITodo> => {
//   return axios.patch(API_URL + 'todos/' + id).then((response) => response.data);
// };

const CutomersService = { getCustomers };
export default CutomersService;
