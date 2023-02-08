import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import lobbyReducer, { LobbyState } from './lobbySlice';

export interface AppState {
  user: UserState;
  lobby: LobbyState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    lobby: lobbyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
