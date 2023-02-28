import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/selectors';
import { config } from '../config';

interface SocketProviderProps {
  children: JSX.Element;
}

export const SocketContext = React.createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const user = useSelector(selectUser);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user.id) return;

    const instance = io(config.apiUrl, { query: { userId: user.id } });

    instance.on('connect', () => {
      setSocket(instance);
    });

    return () => {
      instance.disconnect();
    };
  }, [user.id, setSocket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
