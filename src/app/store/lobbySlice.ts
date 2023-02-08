// eslint-disable-next-line import/named
import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userSlice';

export interface LobbyState {
  id: string;
  owner: User;
  players: User[];
  playersLimit: number;
}

export const lobbySlice = createSlice<LobbyState, SliceCaseReducers<LobbyState>>({
  name: 'lobby',
  initialState: {
    id: '',
    owner: { id: '', avatar: '', name: '' },
    players: [],
    playersLimit: 0,
  },
  reducers: {
    setLobby: (lobbyState: LobbyState, action: PayloadAction<LobbyState>) => {
      const lobby = action.payload;
      lobbyState.id = lobby.id;
      lobbyState.owner = lobby.owner;
      lobbyState.players = lobby.players;
      lobbyState.playersLimit = lobby.playersLimit;
    },
  },
});

export const { setLobby } = lobbySlice.actions;

export default lobbySlice.reducer;
