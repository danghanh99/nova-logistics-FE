import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Export from '../../models/Export';

const todo = createSlice({
  name: 'exports',
  initialState: [] as Export[],
  reducers: {
    getExports: (state, action: PayloadAction<Export[]>) => {
      return (state = action.payload);
    },
  },
});

const { reducer, actions } = todo;
export const { getExports } = actions;
export default reducer;
