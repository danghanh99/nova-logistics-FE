import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Import from '../../models/Import';
import IMeta from '../../types/MetaType';

interface IState {
  data: Import[];
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
  name: 'imports',
  initialState: initialize as IState,
  reducers: {
    getImports: (state, action: PayloadAction<IState>) => {
      return (state = action.payload);
    },
    deleteImport: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter((item: Import) => item.id !== payload);
      return state;
    },
  },
});

const { reducer, actions } = todo;
export const { getImports, deleteImport } = actions;
export default reducer;
