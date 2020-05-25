import React from "react";
import { action } from "@storybook/addon-actions";
import RecipeForm from "../components/RecipeForm";

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
};

export const WithInitialData = () => (
  <RecipeForm {...initialData} title="this is the title" onSubmit={onSubmit} />
);
