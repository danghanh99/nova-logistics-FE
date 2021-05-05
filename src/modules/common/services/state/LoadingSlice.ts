import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

const { reducer, actions } = loading;
export const { isLoading } = actions;
export default reducer;
