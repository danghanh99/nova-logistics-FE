import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Customer from '../../models/Customer';
import IMeta from '../../types/MetaType';

interface IState {
  data: Customer[];
  meta: IMeta;
}

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
  name: 'customers',
  initialState: initialize as IState,
  reducers: {
    getCustomers: (state, action: PayloadAction<IState>) => {
      return (state = action.payload);
    },
    newCustomer: (state, action: PayloadAction<Customer>) => {
      state.data.push(action.payload);
    },
    // deleteCustomer: (state, { payload }: PayloadAction<number>) => {
    //   state.data = state.data.filter((item: Customer) => item.id !== payload);
    //   return state;
    // },
    editCustomer: (state, { payload }: PayloadAction<Customer>) => {
      state.data = [payload];
      return state;
    },
    getCustomer: (state, { payload }: PayloadAction<Customer>) => {
      state.data = [payload];
      return state;
    },
  },
});

const { reducer, actions } = todo;
export const { getCustomers, newCustomer, editCustomer, getCustomer } = actions;
export default reducer;
