// eslint-disable-next-line import/named
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';

import { Lobby } from './lobbySlice';

export interface Game {
  id: string;
  lobby: Lobby;
  roundsCount: number;
}

export interface Round {
  type: 'Drawing' | 'Writing';
  end: number;
}

export interface RoundState extends Round {
  data?: unknown;
}

export interface GameState {
  id: string;
  roundsCount: number;
  rounds: RoundState[];
  isCompleted: boolean;
}

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
  name: 'game',
  initialState: {
    id: '',
    roundsCount: 0,
    rounds: [],
    isCompleted: false,
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
  },
});

export const { setGame, nextRound, completeGame } = gameSlice.actions;

export default gameSlice.reducer;
