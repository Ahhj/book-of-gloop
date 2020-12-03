import React, { useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "./style";
import {
  BodyContainer,
  ButtonContainer,
} from "components/RecipeContainer/style";
import RecipeFormBody from "./components/RecipeFormBody";
import RecipeFormHeader from "./components/RecipeFormHeader";

/**
 * Component to represent form creating/editing recipes.
 * @param {*} props dictionary of recipe fields (title, intro, remarks, tags, image, ingredients, steps)
 */
export default function RecipeForm(props) {
  const { title, intro, remarks, tags, image, ingredients, steps } = props;

  const [state, dispatch] = useReducer(
    (state, action) => stateReducer(state, action),
    { title, intro, remarks, tags, image, ingredients, steps },
    () => initState(props)
  );

  const handleSubmit = useCallback((e) => props.onSubmit(e, state), [
    state,
    props,
  ]);

  const handleReset = useCallback(() => dispatch({ type: "reset" }), []);

  return (
    <div>
      <BodyContainer>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <RecipeFormHeader {...state} onChange={dispatch} />
          <RecipeFormBody {...state} onChange={dispatch} />
        </form>
      </BodyContainer>
      <ButtonContainer>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button>
      </ButtonContainer>
    </div>
  );
}

RecipeForm.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  remarks: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  steps: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
};

/**
 * Initialize the recipe form state.
 */
function initState({ title, intro, remarks, tags, image, ingredients, steps }) {
  ingredients = ingredients ? ingredients : "";
  steps = steps ? steps : "";
  return { title, intro, remarks, tags, image, ingredients, steps };
}

/**
 * Update state given new values and action.
 * Passed as first arg of useReducer
 * @param {Object} state: current state
 * @param {Object} action: key/value to perform update
 */
function stateReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initState();
    default:
      const { key, value } = action;
      let newState = { ...state };
      newState[key] = value;
      return newState;
  }
}
