import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';

const rootReducer = {
  sidebar: sidebarReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
