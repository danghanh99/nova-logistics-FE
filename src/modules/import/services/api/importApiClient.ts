import axios from 'axios';
const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

const getImports = async (
  page?: number,
  perPage?: number,
  search?: string,
  sort?: string
) => {
  return axios
    .get(API_URL + 'imports', {
      params: { page, per_page: perPage, product_name: search, sort },
    })
    .then((response) => {
      return response.data;
    });
};
const ImportsService = {
  getImports,
};
export default ImportsService;
