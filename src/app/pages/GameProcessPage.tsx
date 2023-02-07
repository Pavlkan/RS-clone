import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { useSocket } from '../socket';
import { Lobby, setLobby } from '../store/lobbySlice';

export const SocketContext = React.createContext<Socket | null>(null);

export const GameProcessPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.emit('lobby:create', (lobby: Lobby) => {
      dispatch(setLobby(lobby));
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  );
};
