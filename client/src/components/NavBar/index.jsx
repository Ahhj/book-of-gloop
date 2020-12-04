import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

import { NavItem, NavItemContainer, NavBarSpacer } from "./style";

// TODO: add buttons for edit, save etc

export function NavBar({ items }) {
  return (
    <div>
      <NavItemContainer>
        {items.map((item) => (
          <NavItem key={item.name} to={`${item.to}`} exact={item.exact}>
            {item.name}
          </NavItem>
        ))}
      </NavItemContainer>
      <NavBarSpacer>&nbsp;</NavBarSpacer>
    </div>
  );
}

export function AuthNavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  let navItems = [
    {
      to: !isAuthenticated ? "/login" : "/logout",
      name: !isAuthenticated ? "Login" : "Logout",
    },
    { to: "/", name: "Home", exact: true },
  ];
  if (isAuthenticated) {
    navItems = navItems.concat(
      { to: "/contents", name: "Recipes" },
      { to: "/recipe/new", name: "New" }
    );
  }
  return (
    <div>
      <NavBar items={navItems} />
      <Route
        path={"/login"}
        component={() => {
          loginWithRedirect({ redirect_uri: `${window.location.origin}/` });
          return <div></div>;
        }}
      />
      <Route
        path={"/logout"}
        component={() => {
          logout({ returnTo: window.location.origin });
          return <div></div>;
        }}
      />
    </div>
  );
}
