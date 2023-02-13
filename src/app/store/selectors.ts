import { AppState } from './store';

export const selectIsOwner = ({ user, lobby }: AppState) => user.entity.id && user.entity.id === lobby.owner.id;
export const selectUser = ({ user }: AppState) => user.entity;
export const selectIsUserLoading = ({ user }: AppState) => user.loading;
export const selectIsAuth = ({ user }: AppState) => !!user.entity.id;
export const selectIsExpelled = ({ user }: AppState) => user.expelled;

export const selectLobby = ({ lobby }: AppState) => lobby;

export const selectGame = ({ game }: AppState) => game;
export const selectCurrentRound = ({ game }: AppState) => game.rounds[game.rounds.length - 1] ?? null;
export const selectIsFirstRound = ({ game }: AppState) => game.rounds.length === 1;
// export const selectAlbumData = ({ game }: AppState) => game.rounds
