import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

import { NavItem, NavItemContainer, NavBarSpacer } from "./style";

// TODO: add buttons for edit, save etc

export function NavBar({ items }) {
  return (
    <div>
      <NavItemContainer>
        {items.map((item) => (
          <NavItem key={item.name} to={`${item.to}`}>
            {item.name}
          </NavItem>
        ))}
      </NavItemContainer>
      <NavBarSpacer>&nbsp;</NavBarSpacer>
    </div>
  );
}

export function AuthNavBar() {
  const { isAuthenticated } = useAuth0();
  let navItems = [
    {
      to: !isAuthenticated ? "/login" : "/logout",
      name: !isAuthenticated ? "Login" : "Logout",
    },
    { to: "/", name: "Home" },
  ];
  if (isAuthenticated) {
    navItems = navItems.concat(
      { to: "/contents", name: "Recipes" },
      { to: "/recipe/new", name: "New" }
    );
  }

  return <NavBar items={navItems} />;
}
