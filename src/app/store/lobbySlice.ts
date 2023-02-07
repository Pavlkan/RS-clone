import { createSlice } from '@reduxjs/toolkit';
import { User } from './userSlice';

export interface Lobby {
  id: string;
  owner: User;
  players: User[];
  playersLimit: number;
}

export const lobbySlice = createSlice<Lobby, any>({
  name: 'lobby',
  initialState: {
    id: '',
    owner: { id: '', avatar: '', name: '' },
    players: [],
    playersLimit: 0,
  },
  reducers: {
    setLobby: (state: any, action: any) => {
      const lobby = action.payload;
      state.id = lobby.id;
      state.owner = lobby.owner;
      state.players = lobby.players;
      state.playersLimit = lobby.playersLimit;
    },
  },
});

export const { setLobby } = lobbySlice.actions as any;

export default lobbySlice.reducer;
