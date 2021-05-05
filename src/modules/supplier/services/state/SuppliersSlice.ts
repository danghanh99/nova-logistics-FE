import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Supplier from '../api/types/Supplier';
import IMeta from '../../../common/services/api/types/MetaType';

interface IState {
  data: Supplier[];
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
  name: 'suppliers',
  initialState: initialize as IState,
  reducers: {
    getSuppliers: (state, action: PayloadAction<IState>) => {
      return (state = action.payload);
    },
    newSupplier: (state, action: PayloadAction<Supplier>) => {
      state.data.push(action.payload);
    },
    editSupplier: (state, { payload }: PayloadAction<Supplier>) => {
      state.data = [payload];
      return state;
    },
    getSupplier: (state, { payload }: PayloadAction<Supplier>) => {
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
  getSuppliers,
  newSupplier,
  editSupplier,
  getSupplier,
} = actions;
export default reducer;
