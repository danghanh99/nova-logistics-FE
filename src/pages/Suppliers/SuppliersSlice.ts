import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISupplier from '../../types/SupplierType';

// interface IState {
//   data: ISupplier[];
//   meta: Hash;
// }
const todo = createSlice({
  name: 'suppliers',
  initialState: [] as ISupplier[],
  reducers: {
    // addTodo: (state, action: PayloadAction<ISupplier>) => {
    //   state.push(action.payload);
    // },
    getSuppliers: (state, action: PayloadAction<ISupplier[]>) => {
      return (state = action.payload);
    },
    // editDoneTodo: (state: ISupplier[], action: PayloadAction<ISupplier>) => {
    //   const index = state.findIndex((item) => item.id === action.payload.id);
    //   const editTodo = state[index];
    //   editTodo.done = action.payload.done;
    //   editTodo.title = action.payload.title;
    // },
    // deleteTodo: (state, action: PayloadAction<number>) => {
    //   return state.filter((item: ISupplier) => item.id !== action.payload);
    // },
  },
});

const { reducer, actions } = todo;
export const { getSuppliers } = actions;
export default reducer;
