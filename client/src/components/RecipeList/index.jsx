import React from "react";
import {
  RecipeListBody,
  SearchBar,
  RecipeLink,
  RecipeLinkContainer,
} from "./style";

/**
 * Component representing a list of recipes
 * @param {array} items list of dictionary objects containing recipe data
 * @param {string} default default value to populate the search bar
 * @param {function} onSearch callback when query entered in search bar
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
