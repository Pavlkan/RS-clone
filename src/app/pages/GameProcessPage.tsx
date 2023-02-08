import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { useSocket } from '../socket';
import { LobbyState, setLobby } from '../store/lobbySlice';

export const SocketContext = React.createContext<Socket | null>(null);

export const GameProcessPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  );
};
