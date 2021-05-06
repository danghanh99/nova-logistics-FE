import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../api/types/Product';
import IMeta from '../../../../types/MetaType';

type State = {
  data: Product[];
  meta: IMeta;
};

const initialize = {
  data: [],
  meta: {
    current_page: 1,
    page_size: 0,
    total_pages: 1,
    total_count: 0,
  },
};

const todo = createSlice({
  name: 'products',
  initialState: initialize as State,
  reducers: {
    getProducts: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },

    createProduct: (state, { payload }: PayloadAction<Product>) => {
      state.data.push(payload);
      return state;
    },
  },
});

const { reducer, actions } = todo;
export const { getProducts, createProduct } = actions;
export default reducer;
