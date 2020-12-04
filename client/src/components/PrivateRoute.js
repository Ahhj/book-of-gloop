import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "react-auth0-spa";

const PrivateRoute = ({ path, component: Component, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    } else {
      (async () => {
        await loginWithRedirect({});
      })();
    }
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  return (
    <Route
      path={path}
      component={() => (isAuthenticated ? <Component /> : null)}
      {...rest}
    />
  );
};

export default PrivateRoute;
