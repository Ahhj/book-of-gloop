import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeClassName = "nav-item-active";

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  color: white;
  &.${activeClassName} {
    color: white;
    font-weight: bold;
  }
  padding: 0.5em 1em;
  display: flex;
  float: left;
  text-decoration: none;
`;

const navBarHeight = "2.5em";

export const NavItemContainer = styled.div`
  /** fixes the navbar to the top */
  position: fixed;
  top: 0px;
  left: 0px;

  text-align: left;

  /** let the navbar take the whole width and do not scroll horizontally */
  display: block;
  overflow: hidden;
  width: 100%;

  /** sets a fixed height that we can use when styling the content */
  height: ${navBarHeight};

  /** make sure the navbar is in front of the content*/
  z-index: 5;

  background-color: palevioletred;
`;

export const NavBarSpacer = styled.div`
  height: ${navBarHeight};
  display: block;
`;
