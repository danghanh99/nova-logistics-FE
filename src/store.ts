import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './containers/SidebarSlice';
import loginReducer from './components/Login/LoginSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  isLoggedIn: loginReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
