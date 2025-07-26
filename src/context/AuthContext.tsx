import React, { createContext, type Dispatch, type SetStateAction } from "react";
import type { CompanySettings, UserInfo } from "../types";


interface AuthContextType {
    handleLogout: () => void;
    myInfo: UserInfo | undefined; // Replace 'any' with the appropriate type if known
    setMyInfo: Dispatch<SetStateAction<UserInfo | undefined>>; // Replace 'any' with the appropriate type if known
    api: string | undefined;
    appLink: string | undefined;
    dropLink: string | undefined;
    nodesSrv: string | undefined;
    pageTitle: string;
    setPageTitle: React.Dispatch<React.SetStateAction<string>>;
    compSettings: CompanySettings | undefined; // Replace 'any' with the appropriate type if known
    setCompSettings: Dispatch<SetStateAction<CompanySettings | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({
    handleLogout: () => {},
    myInfo: undefined,
    setMyInfo: () => {}  ,              
    api: "",
    appLink: "",
    dropLink: "",
    nodesSrv: "",
    pageTitle: "",
    setPageTitle: () => {},
    compSettings: undefined,
    setCompSettings: () => {},
});



