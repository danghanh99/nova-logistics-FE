import axios from 'axios';
import Export from '../modules/export/services/api/types/Export';
import IMeta from '../types/MetaType';

const API_URL = 'https://nova-logistics-backend.herokuapp.com/api/v1/';

interface IState {
  data: Export[];
  meta: IMeta;
}
const getExports = (
  page?: number,
  perPage?: number,
  search?: string,
  sort?: string
): Promise<IState> => {
  return axios
    .get(API_URL + 'exports', {
      params: { page, per_page: perPage, product_name: search, sort },
    })
    .then((response) => {
      return response.data;
    });
};

const deleteExport = async (id: number) => {
  const response = await axios.delete(`${API_URL}exports/${id}`);
  if (response.data) return response.data;
  return response;
};

const createExport = async (
  sellPrice: number,
  quantity: number,
  description: string,
  exportedDate: string,
  productId: number,
  customerId: number
) => {
  const response = await axios.post(`${API_URL}exports`, {
    sell_price: sellPrice,
    quantity,
    description,
    exported_date: exportedDate,
    product_id: productId,
    customer_id: customerId,
  });
  if (response.data) return response.data;
  return response;
};

const ExportsService = { deleteExport, getExports, createExport };
export default ExportsService;
