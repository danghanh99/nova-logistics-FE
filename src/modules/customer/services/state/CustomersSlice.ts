import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Customer from '../../services/api/types/Customer';
import IMeta from '../../../common/services/api/types/MetaType';

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
    editCustomer: (state, { payload }: PayloadAction<Customer>) => {
      state.data = [payload];
      return state;
    },
    getCustomer: (state, { payload }: PayloadAction<Customer>) => {
      state.data = [payload];
      return state;
    },
    reset: (state, { payload }: PayloadAction<boolean>) => {
      if (payload) state = initialize;
      return state;
    },
  },
});

const { reducer, actions } = todo;
export const {
  reset,
  getCustomers,
  newCustomer,
  editCustomer,
  getCustomer,
} = actions;
export default reducer;
