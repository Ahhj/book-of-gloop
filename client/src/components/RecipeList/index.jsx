import React from "react";
import {
  RecipeListBody,
  SearchBar,
  RecipeLink,
  RecipeLinkContainer,
} from "./style";

/**
 * A list of recipes.
 * @param {*} param0
 */
export default function RecipeList({ items, defaultSearchValue, onSearch }) {
  return (
    <RecipeListBody>
      <SearchBar
        type="text"
        placeholder={"Search for a recipe, ingredient etc."}
        defaultValue={defaultSearchValue}
        onKeyDown={onSearch}
      />
      {items.map((item, key) => (
        <RecipeLinkContainer key={key}>
          <RecipeLink to={`/recipe/${item.id}`}>
            {item.name.replace(".json", "")}
          </RecipeLink>
        </RecipeLinkContainer>
      ))}
    </RecipeListBody>
  );
}
