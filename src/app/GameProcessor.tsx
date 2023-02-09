import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSocket } from './socket/useSocket';
import { addPlayer, LobbyState, removePlayer, setLobby } from './store/lobbySlice';
import { User } from './store/userSlice';
import { Game, setGame } from './store/gameSlice';
import { SocketProvider } from './socket/SocketProvider';

export const GameProcessor = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('PlayerJoinedLobby', (player: User) => {
      dispatch(addPlayer(player));
    });

    socket?.on('PlayerLeftLobby', (player: User) => {
      dispatch(removePlayer(player));
    });

    socket?.on('PlayerWasExpelled', (player: User) => {
      dispatch(removePlayer(player));
    });

    socket?.on('GameStarted', (game: Game) => {
      dispatch(setGame(game));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const lobby = new URLSearchParams(location.search).get('lobby');

    if (lobby) {
      socket?.emit('lobby:join', lobby, (lobby: LobbyState) => {
        navigate({ search: '' });
        dispatch(setLobby(lobby));
      });
    } else {
      socket?.emit('lobby:create', (lobby: LobbyState) => {
        dispatch(setLobby(lobby));
      });
    }
  }, [socket, dispatch, navigate]);

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};
