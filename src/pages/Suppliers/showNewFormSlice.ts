import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISupplier from '../../types/SupplierType';

const todo = createSlice({
  name: 'suppliers',
  initialState: false,
  reducers: {
    enableShowForm: (state) => {
      return (state = true);
    },
    disableShowForm: (state) => {
      return (state = false);
    },
  },
});

const { reducer, actions } = todo;
export const { enableShowForm } = actions;
export default reducer;
