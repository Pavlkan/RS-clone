// eslint-disable-next-line import/named
import { configureStore, combineReducers, Action, Reducer } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import lobbyReducer, { LobbyState } from './lobbySlice';
import gameReducer, { GameState } from './gameSlice';

export interface AppState {
  user: UserState;
  lobby: LobbyState;
  game: GameState;
}

const appReducer = combineReducers({
  user: userReducer,
  lobby: lobbyReducer,
  game: gameReducer,
});

const reducerProxy: Reducer = (state: AppState, action: Action) => {
  if (action.type === 'reset') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
});

export type AppDispatch = typeof store.dispatch;
