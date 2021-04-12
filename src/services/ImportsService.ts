import axios from 'axios';
import { Hash } from 'crypto';
import Import from '../models/Import';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Import[];
  meta: Hash;
}
const getImports = (): Promise<IState> => {
  return axios
    .get(API_URL + 'imports', {
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

const ImportsService = { getImports };
export default ImportsService;
