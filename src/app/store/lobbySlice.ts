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
    addPlayer: (lobbyState: LobbyState, action: PayloadAction<User>) => {
      lobbyState.players.push(action.payload);
    },
    removePlayer: (lobbyState: LobbyState, action: PayloadAction<User>) => {
      const index = lobbyState.players.findIndex(player => player.id === action.payload.id);
      if (index !== -1) lobbyState.players.splice(index, 1);
    },
  },
});

export const { setLobby, addPlayer, removePlayer } = lobbySlice.actions;

export default lobbySlice.reducer;
