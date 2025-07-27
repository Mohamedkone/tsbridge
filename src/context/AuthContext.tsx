// src/context/AuthContext.tsx
import React, { createContext, type Dispatch, type SetStateAction } from "react";
import type { CompanySettings, UserInfo } from "../types";

interface AuthContextType {
    handleLogout: () => void;
    handleLogin: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    myInfo: UserInfo | undefined;
    setMyInfo: Dispatch<SetStateAction<UserInfo | undefined>>;
    api: string | undefined;
    dropLink: string | undefined;
    nodesSrv: string | undefined;
    pageTitle: string;
    setPageTitle: React.Dispatch<React.SetStateAction<string>>;
    compSettings: CompanySettings | undefined;
    setCompSettings: Dispatch<SetStateAction<CompanySettings | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({
    handleLogout: () => {},
    handleLogin: async () => false,
    isAuthenticated: false,
    isLoading: false,
    myInfo: undefined,
    setMyInfo: () => {},
    api: "",
    dropLink: "",
    nodesSrv: "",
    pageTitle: "",
    setPageTitle: () => {},
    compSettings: undefined,
    setCompSettings: () => {},
});