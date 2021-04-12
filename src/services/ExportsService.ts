import axios from 'axios';
import { Hash } from 'crypto';
import Export from '../models/Export';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Export[];
  meta: Hash;
}
const getExports = (): Promise<IState> => {
  return axios.get(API_URL + 'exports').then((response) => {
    return response.data;
  });
};

const ExportsService = { getExports };
export default ExportsService;
