import React from "react";
import { NavBar } from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "NavBar",
};

const navItems = [
  {
    name: "page1",
    to: "/page1",
  },
  {
    name: "page2",
    to: "/page2",
  },
];

export const Default = () => (
  <Router>
    <NavBar items={[]} />
  </Router>
);

export const WithData = () => (
  <Router>
    <NavBar items={navItems} />
  </Router>
);
