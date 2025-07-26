import { createContext } from "react";
import { Socket } from "socket.io-client";

interface WSContextType {
  ws: Socket | null;
}

export const WSContext = createContext<WSContextType>({
  ws: null
});
