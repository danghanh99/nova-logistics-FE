import axios from 'axios';
import { Hash } from 'crypto';
import ISupplier from '../types/SupplierType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: ISupplier[];
  meta: Hash;
}
const getSuppliers = (): Promise<IState> => {
  return axios.get(API_URL + 'suppliers').then((response) => {
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

const SuppliersService = { getSuppliers };
export default SuppliersService;
