import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Import from '../api/types/Import';
import IMeta from '../../../common/services/api/types/MetaType';

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
    newImport: (state, action: PayloadAction<Import>) => {
      state.data.push(action.payload);
    },
    getImport: (state, { payload }: PayloadAction<Import>) => {
      state.data = [payload];
      return state;
    },
    updateImport: (state, { payload }: PayloadAction<Import>) => {
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
  getImports,
  deleteImport,
  getImport,
  reset,
  updateImport,
  newImport,
} = actions;
export default reducer;
