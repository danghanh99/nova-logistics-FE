import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../../models/Product';

const todo = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    getProducts: (state, action: PayloadAction<Product[]>) => {
      return (state = action.payload);
    },
  },
});

const { reducer, actions } = todo;
export const { getProducts } = actions;
export default reducer;
