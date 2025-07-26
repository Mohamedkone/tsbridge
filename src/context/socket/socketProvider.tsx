/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthContext";
import { destroyRoom, getUsers, roomDestroyed } from "./wsEventHandlers";
import { WSContext } from "./wsContext";
import { SocketContext } from "./socketContext";


export const SocketProvider = ({ children }:any) => {
    const navigate = useNavigate();
    const { ws } = useContext(WSContext)
    const { myInfo, nodesSrv } = useContext(AuthContext);
    const [roomId, setRoomId] = useState("");
    const [thisAdmin, setThisAdmin] = useState("");
    const [thisRoomActions, setThisRoomActions] = useState();
    const [roomLock, setRoomLock] = useState(null);
    
    useEffect(() => {
        
       if(ws){ 
        ws.on("get-users", (data: { admin: any; locked: any; roomActions: any; })=>getUsers(setRoomLock, setThisAdmin, setThisRoomActions)(data));
        ws.on('room-closed', () => roomDestroyed());
        ws.on('delete-closed', (data: { roomId: any; }) => destroyRoom(nodesSrv)(data));

        // Handle cleanup
        return () => {
            ws.off("room-created");
            ws.off("get-users");
            ws.off('room-closed');
            ws.off('delete-closed');
        };}
    }, [navigate, nodesSrv, ws]);

    useEffect(() => {
        if (!ws) return;
        ws.on('close', () => {
            if (myInfo?.id && roomId) {
                ws.emit('leave-room', { roomId, peerId: myInfo.id });
            }
        })
    }, [myInfo, roomId, ws]);

    return (
        <SocketContext.Provider value={{
            ws,
            thisAdmin,
            roomId,
            setRoomId,
            roomLock,
            setRoomLock,
            thisRoomActions
        }}>
            {children}
        </SocketContext.Provider>
    );
};