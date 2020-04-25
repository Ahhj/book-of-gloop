// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Login</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};

export default NavBar;