import React, { useState, useCallback } from "react";
import { useGetWithAuth0 } from "../../hooks/restful-auth0";
import RecipeList from "../RecipeList";

/**
 * Interacts with API to provide data for RecipeList component.
 */
export default function RecipeListContainer() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("*");

  const { loading } = useGetWithAuth0({
    base: `/api/recipes`,
    path: "/list/",
    lazy: false,
    resolve: ({ recipes }) => setRecipes(recipes),
    queryParams: { fullTextContains: filter },
    debounce: true,
  });

  const handleSearch = useCallback((e) => {
    if (e.key === "Enter") {
      const newFilter = e.target.value;
      setFilter(newFilter);
    }
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : !recipes.length === 0 ? (
        "These are not the recipes you are looking for!"
      ) : (
        <RecipeList
          items={recipes}
          defaultSearchValue={filter === "*" ? null : filter}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
