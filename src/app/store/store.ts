import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import lobbyReducer, { LobbyState } from './lobbySlice';
import gameReducer, { GameState } from './gameSlice';

export interface AppState {
  user: UserState;
  lobby: LobbyState;
  game: GameState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    lobby: lobbyReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
