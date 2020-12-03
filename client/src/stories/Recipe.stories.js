import React from "react";
import Recipe from "../components/Recipe";
import okonomiyaki from "../assets/images/okonomiyaki.jpg";

export default {
  title: "Recipe",
};

const recipeData = {
  title: "Gloopy stuff",
  tags: ["gloop", "slop"],
  intro: "This is some yummy gloop",
  remarks: "Its real yummy",
  image: okonomiyaki,
  ingredients: "Gloop",
  steps: "1. Gloop the gloop \n2. Slop the slop",
};

export const Default = () => <Recipe {...recipeData} />;
