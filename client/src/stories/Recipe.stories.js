import React from "react";
import Recipe from "../components/Recipe";

export default {
  title: "Recipe",
};

const recipeData = {
  title: "Gloopy stuff",
  tags: ["gloop", "slop"],
  intro: "This is some yummy gloop",
  remarks: "Its real yummy",
  ingredients: [
    {
      name: "Gloop",
      quantity: "10 gallons",
    },
    {
      name: "Slop",
      quantity: "100kg",
    },
    {
      name: "More slop",
      quantity: "100kg",
    },
  ],
  steps: [
    {
      description: "Slop the slop",
      order: 1,
      updatedAt: new Date(2018, 0, 1, 9, 0),
    },
    {
      description: "Gloop the gloop",
      order: 2,
      updatedAt: new Date(2018, 0, 1, 9, 0),
    },
  ],
};

export const Default = () => <Recipe {...recipeData} />;
