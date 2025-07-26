/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { Socket } from "socket.io-client";


interface SocketContextType {
  ws: Socket | null;
  thisAdmin: any;
    roomId: any;
    setRoomId: any;
    roomLock: any;
    setRoomLock: any;
    thisRoomActions: any;
}

export const SocketContext = createContext<SocketContextType>({
     ws: null,
    thisAdmin: null,
    roomId: null,
    setRoomId: null,
    roomLock: null,
    setRoomLock: null,
    thisRoomActions: null,
});


