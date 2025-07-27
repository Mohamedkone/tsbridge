// src/context/AuthProvider.tsx
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { CompanySettings, UserInfo } from "../types";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [myInfo, setMyInfo] = useState<UserInfo>();
    const [pageTitle, setPageTitle] = useState<string>("Page...");
    const [compSettings, setCompSettings] = useState<CompanySettings | undefined>();
    const [isAuthenticated] = useState<boolean>(true);
    const [isLoading] = useState<boolean>(false);
    
    const api = import.meta.env.VITE_API;
    const dropLink = import.meta.env.VITE_DROP;
    const nodesSrv = import.meta.env.VITE_NODES;


    const handleLogin = () => {
    };

    const handleLogout = () => {
    };

    return (
        <AuthContext.Provider value={{
            handleLogout,
            handleLogin,
            isAuthenticated,
            isLoading,
            myInfo,
            setMyInfo,
            api,
            dropLink,
            nodesSrv,
            pageTitle,
            setPageTitle,
            compSettings,
            setCompSettings
        }}>
            {children}
        </AuthContext.Provider>
    );
};