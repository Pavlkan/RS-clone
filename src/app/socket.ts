import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket() {
  const user = useSelector((state: any) => state.user.entity);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user.id) return;

    const instance = io('http://localhost:3001', { query: { userId: user.id } });

    instance.on('connect', () => {
      setSocket(instance);
    });

    return () => {
      instance.off('connect');
    };
  }, [user, setSocket]);

  return socket;
}
