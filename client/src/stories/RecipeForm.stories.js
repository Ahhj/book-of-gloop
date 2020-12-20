import React from "react";
import { action } from "@storybook/addon-actions";
import RecipeForm from "../components/RecipeForm";
import okonomiyaki from "../assets/images/okonomiyaki.jpg";

export default {
  title: "RecipeForm",
  component: RecipeForm,
};

const onSubmit = (e) => {
  e.preventDefault();
  action("form submitted")(e);
};

export const EmptyForm = () => <RecipeForm onSubmit={onSubmit} />;

const initialData = {
  title: "this is the title",
  intro: "this is the intro",
  remarks: "these are the remarks",
  tags: ["these are some tags tag1", "tag2"],
  image: okonomiyaki,
  duration: {
    cook: "1 hour",
    rest: "5 minutes",
    prep: "30 minutes",
  },
};

export const WithInitialData = () => (
  <RecipeForm {...initialData} title="this is the title" onSubmit={onSubmit} />
);
