import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Import from '../../models/Import';

const todo = createSlice({
  name: 'imports',
  initialState: [] as Import[],
  reducers: {
    getImports: (state, action: PayloadAction<Import[]>) => {
      return (state = action.payload);
    },
  },
});

const { reducer, actions } = todo;
export const { getImports } = actions;
export default reducer;
