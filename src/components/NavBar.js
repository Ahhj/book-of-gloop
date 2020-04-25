// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log(window.location.origin)
  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({ redirect_uri: `${window.location.origin}/Contents` })}>Login</button>
      )}
      {isAuthenticated && <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>}
      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/Contents">Contents</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;