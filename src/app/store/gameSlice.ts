// eslint-disable-next-line import/named
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

import { Lobby } from './lobbySlice';

export interface Game {
  id: string;
  lobby: Lobby;
  roundsCount: number;
}

export interface Round {
  type: 'drawing' | 'writing';
  end: number;
}

export interface RoundState extends Round {
  data?: unknown;
}

export interface GameAlbum {
  data: [string, [string, string | null]];
}

export interface GameState {
  id: string;
  roundsCount: number;
  rounds: RoundState[];
  isCompleted: boolean;
  gameAlbum: GameAlbum;
}

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
  name: 'game',
  initialState: {
    id: '',
    roundsCount: 0,
    rounds: [],
    isCompleted: false,
    gameAlbum: { data: ['', ['', null]] },
  },
  reducers: {
    setGame: (state: GameState, action: PayloadAction<Game>) => {
      state.id = action.payload.id;
      state.roundsCount = action.payload.roundsCount;
    },
    nextRound: (state: GameState, action: PayloadAction<[Round, unknown]>) => {
      const [round, data]: [Round, unknown] = action.payload;
      state.rounds.push({ ...round, data });
    },
    completeGame: (state: GameState) => {
      state.isCompleted = true;
    },
    setGameAlbum: (state: GameState, action: PayloadAction<GameAlbum>) => {
      state.gameAlbum.data = action.payload.data;
    },
  },
});

export const { setGame, nextRound, completeGame, setGameAlbum } = gameSlice.actions;

export default gameSlice.reducer;
