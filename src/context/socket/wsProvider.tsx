/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useContext, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { io } from "socket.io-client";
import { WSContext } from "./wsContext";

export const WSProvider = ({ children }:any) => {
    const { nodesSrv } = useContext(AuthContext);

    // Memoized WebSocket instance
    const ws:any = useRef(null);
    
    useEffect(() => {
        ws.current = io(process.env.REACT_APP_API);
        console.log("WebSocket Initialized");
        return () => {
            console.log("Cleaning up WebSocket");
            ws.current.disconnect();
        };
    }, [nodesSrv]);

    return (
        <WSContext.Provider value={{
            ws: ws.current,
        }}>
            {children}
        </WSContext.Provider>
    );
};
