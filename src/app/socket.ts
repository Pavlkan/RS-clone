import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { selectUser } from './store/selectors';
import { User } from './store/userSlice';
import { AppDispatch } from './store/store';
import { addPlayer, removePlayer } from './store/lobbySlice';
import { Game, setGame } from './store/gameSlice';

export function useSocket() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user.id) return;

    const instance = io('http://localhost:3001', { query: { userId: user.id } });

    instance.on('connect', () => {
      setSocket(instance);
    });

    instance.on('PlayerJoinedLobby', (player: User) => {
      dispatch(addPlayer(player));
    });

    instance.on('PlayerLeftLobby', (player: User) => {
      dispatch(removePlayer(player));
    });

    instance.on('PlayerLeftLobby', (player: User) => {
      dispatch(removePlayer(player));
    });

    instance.on('GameStarted', (game: Game) => {
      dispatch(setGame(game));
    });

    return () => {
      instance.disconnect();
    };
  }, [user, setSocket, dispatch]);

  return socket;
}
