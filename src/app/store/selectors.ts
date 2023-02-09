import { AppState } from './store';

export const selectIsOwner = ({ user, lobby }: AppState) => user.entity.id && user.entity.id === lobby.owner.id;
export const selectUser = ({ user }: AppState) => user.entity;
export const selectIsUserLoading = ({ user }: AppState) => user.loading;

export const selectLobby = ({ lobby }: AppState) => lobby;

export const selectGame = ({ game }: AppState) => game;
