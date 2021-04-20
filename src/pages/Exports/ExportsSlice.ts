import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Export from '../../models/Export';
import IMeta from '../../types/MetaType';

interface IState {
  data: Export[];
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
  name: 'exports',
  initialState: initialize as IState,
  reducers: {
    getExports: (state, action: PayloadAction<IState>) => {
      return (state = action.payload);
    },
    deleteExport: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter((item: Export) => item.id !== payload);
      return state;
    },
    
  },
});

const { reducer, actions } = todo;
export const { getExports, deleteExport } = actions;
export default reducer;
