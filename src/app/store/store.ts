import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import lobbyReducer from './lobbySlice';

export default configureStore({
  reducer: {
    user: userReducer,
    lobby: lobbyReducer,
  },
});
