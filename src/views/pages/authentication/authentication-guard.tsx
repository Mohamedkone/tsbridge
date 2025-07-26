/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";

export const AuthenticationGuard = ({ component }:any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <Loading />
      </div>
    ),
  });

  return <Component />;
};