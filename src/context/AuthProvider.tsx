import { useCookies } from "react-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { CompanySettings, UserInfo } from "../types";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [cookies, , removeCookie] = useCookies();
    const [myInfo, setMyInfo] = useState<UserInfo>(); // Replace 'any' with the appropriate type if known
    const [pageTitle, setPageTitle] = useState<string>("Page...");
    const [compSettings, setCompSettings] = useState<CompanySettings | undefined>(); // Replace 'any' with the appropriate type if known
    const { logout } = useAuth0();
    const api = import.meta.env.VITE_API;
    const dropLink = import.meta.env.VITE_DROP;
    const nodesSrv = import.meta.env.VITE_NODES;

    const handleLogout = () => {
        if (cookies['auth-r-key']) removeCookie('auth-r-key');
        logout({
            logoutParams: {
                returnTo: `${window.location.origin}/login`,
            },
        });
    };

    axios.defaults.headers.common['authorization'] = cookies["auth-r-key"];

    return (
        <AuthContext.Provider value={{ handleLogout, myInfo, setMyInfo, api, dropLink, nodesSrv, pageTitle, setPageTitle, compSettings, setCompSettings }}>
            {children}
        </AuthContext.Provider>
    );
};