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
  },
});

const { reducer, actions } = todo;
export const { getImports } = actions;
export default reducer;
