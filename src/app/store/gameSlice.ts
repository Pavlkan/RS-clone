// eslint-disable-next-line import/named
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

import { Lobby } from './lobbySlice';

export interface Game {
  id: string;
  lobby: Lobby;
  roundsCount: number;
}

export interface GameState {
  id: string;
  roundsCount: number;
}

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
  name: 'game',
  initialState: {
    id: '',
    roundsCount: 0,
  },
  reducers: {
    setGame: (state: GameState, action: PayloadAction<Game>) => {
      state.id = action.payload.id;
      state.roundsCount = action.payload.roundsCount;
    },
  },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
