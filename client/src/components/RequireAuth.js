import React from "react";
import { useGoogleOAuth } from "../react-google-oauth";

/**
 * Renders children if authenticated, else renders message asking for login
 */
export default ({ children }) => {
  const { loading, isAuthenticated } = useGoogleOAuth();

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
