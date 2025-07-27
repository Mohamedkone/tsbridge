/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider, useMediaQuery, useTheme } from "@mui/material";
import { 
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import { useContext } from "react";

import themes from "./themes";
import NavigationScroll from "./layout/NavigationScroll";

import MainLayout from "./layout/MainLayout";
import MinimalLayout from "./layout/MinimalLayout/MinimalLayout";
import ErrorRoute from "./routes/ErrorRoute";

import AccountSetting from "./views/pages/account/AccountSetting";
import Vault from "./views/pages/vault/finder/Vault";
import Logs from "./views/dashboard/transfers/Logs";
import MaintenancePage from "./MaintenancePage";
import Bridge from "./views/pages/bridge";
import Dashboard from "./views/dashboard/Dash";
import Admin from "./views/dashboard/Admin";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Auth from "./views/pages/authentication/authentication/Auth";

const UnauthenticatedRoutes = ({isMobile}:{isMobile:boolean}) => (
  <Routes>
    <Route path="/" element={<MinimalLayout />}>
      {/* <Route index element={<AuthLogin />} />
      <Route path="login" element={<AuthLogin />} /> */}
      <Route index element={<Auth isMobile={isMobile}/>} />
      <Route path="login" element={<Auth isMobile={isMobile} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

const AuthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="admin" element={<Admin />} />
      <Route path="transfers" element={<Logs />} />
      <Route path="account" element={<AccountSetting />} />
      <Route path="vault" element={<Vault />} />
      <Route path="bridge">
        <Route index element={<Bridge />} />
        <Route path="generate" element={<Bridge />} />
      </Route>
      <Route path="*" element={<ErrorRoute />} />
    </Route>
  </Routes>
);

// const LoadingSpinner = () => (
//   <Box
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh'
//     }}
//   >
//     <CircularProgress 
//       size={64}
//       color="success"
//       thickness={2}
//     />
//   </Box>
// );

const App = () => {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const customization = useSelector((state: any) => state.customization);
  const theme = useTheme()
  const { isLoaded } = useAuth()
  const isMobile = useMediaQuery(theme.breakpoints.down(1020))
// console.log(isAuthenticated, user)

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }
  
  if (!isLoaded) {
    return <></>;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {/* {(!isAuthenticated && isLoaded) && */}
          <SignedOut>
            <UnauthenticatedRoutes isMobile={isMobile} />
          </SignedOut>
          {/* } */}
          {/* {(isAuthenticated && isLoaded) && */}
          <SignedIn>
            <AuthenticatedRoutes />
          </SignedIn>
          {/* } */}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;