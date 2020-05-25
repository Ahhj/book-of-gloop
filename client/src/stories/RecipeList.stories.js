import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeList from "../components/RecipeList";

export default {
  title: "RecipeList",
};

const recipes = [
  {
    name: "testName",
    fileId: "testId",
  },
];

export const Default = () => (
  <Router>
    <RecipeList items={[]} />
  </Router>
);

export const WithData = () => (
  <Router>
    <RecipeList items={recipes} />
  </Router>
);
