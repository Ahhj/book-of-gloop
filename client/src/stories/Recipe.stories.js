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
      name: "More slop More slop More slop",
      quantity: "100",
      units: "g",
    },
  ],
  steps: [
    {
      description:
        "Slop the slop Slop the slop Slop the slop Slop the slop Slop the slop Slop the slop Slop the slop ",
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
