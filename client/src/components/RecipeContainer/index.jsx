import React, { useState, useReducer, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetWithAuth0, useMutateWithAuth0 } from "../../hooks/restful-auth0";
import Recipe from "components/Recipe";
import RecipeForm from "components/RecipeForm";
import { Button, EditButtonContainer } from "./style";

export default function RecipeContainer() {
  let history = useHistory(); // For redirect
  let { recipeId } = useParams();
  const base = `/api/recipes`;
  const creating = recipeId === "new";
  const [editable, setEditable] = useState(creating);
  const [state, dispatch] = useReducer(function(state, action) {
    switch (action.type) {
      default:
        const { key, value } = action;
        let newState = { ...state };
        newState[key] = value;
        return newState;
    }
  }, {});

  const { data, loading } = useGetWithAuth0({
    base,
    path: "/download/",
    queryParams: { fileId: recipeId },
    lazy: creating,
    resolve: (data) => {
      for (let key in data) {
        const value = data[key];
        dispatch({ key, value });
      }
    },
  });

  const { mutate: update } = useMutateWithAuth0({
    base,
    path: "/update/",
    verb: "PUT",
  });

  const { mutate: create, loading: uploading } = useMutateWithAuth0({
    base,
    path: "/create/",
    verb: "POST",
  });

  const handleSubmit = useCallback(
    function(e, result) {
      e.preventDefault();
      let mounted = true;
      if (mounted) {
        if (!creating) {
          // Update through API and preserve state.
          update({ fileId: recipeId, data: result });
          setEditable(!editable);
          for (let key in result) {
            const value = result[key];
            dispatch({ key, value });
          }
        } else {
          // Create through API and ridrect to new recipe.
          create({ data: result }).then(({ fileId }) => {
            history.push(`/recipe/${fileId}`);
          });
        }
      }
      mounted = false;
    },
    [creating, editable, recipeId, history, update, create]
  );

  return (
    <div>
      {uploading ? (
        <div>Uploading...</div>
      ) : (
        <div>
          {loading && !data ? (
            <div>Loading...</div>
          ) : (
            <div>
              {!editable ? (
                <Recipe {...state}></Recipe>
              ) : (
                <RecipeForm onSubmit={handleSubmit} {...state}></RecipeForm>
              )}
            </div>
          )}
        </div>
      )}
      <EditButtonContainer>
        {!editable ? (
          <Button onClick={() => setEditable(!editable)}>Edit</Button>
        ) : null}
      </EditButtonContainer>
    </div>
  );
}