import React from "react";
import { useAuth0 } from "react-auth0-spa";

/**
 * Renders children if authenticated, else renders message asking for login
 */
export default ({ children }) => {
  const { loading, isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      {" "}
      {isAuthenticated
        ? children
        : loading
        ? "Loading..."
        : "Please login to access this page"}
    </React.Fragment>
  );
};
