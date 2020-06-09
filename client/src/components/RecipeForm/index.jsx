import React, { useReducer, useCallback } from "react";
import { Row, Column } from "components/Grid";
import ImageDropZone from "components/ImageDropZone";
import EditableIngredients from "components/EditableIngredients";
import EditableSteps from "components/EditableSteps";
import {
  FormContainer,
  TitleInput,
  IntroInput,
  RemarksInput,
  TagsInput,
  Button,
} from "./style";
import { BodyContainer } from "../RecipeContainer/style";

export default function RecipeForm({
  title,
  intro,
  remarks,
  tags,
  image,
  ingredients,
  steps,
  onSubmit,
}) {
  const init = () => {
    ingredients = ingredients ? ingredients : [];
    steps = steps ? steps : [];
    return { title, intro, remarks, tags, image, ingredients, steps };
  };
  const [state, dispatch] = useReducer(
    function(state, action) {
      switch (action.type) {
        case "reset":
          return init();
        default:
          const { key, value } = action;
          let newState = { ...state };
          newState[key] = value;
          return newState;
      }
    },
    { title, intro, remarks, tags, image, ingredients, steps },
    init
  );
  const handleSubmit = useCallback((e) => onSubmit(e, state), [
    state,
    onSubmit,
  ]);
  const handleReset = useCallback(() => dispatch({ type: "reset" }), []);
  const handleChangeInput = useCallback(
    (e) => dispatch({ key: e.target.name, value: e.target.value }),
    []
  );
  const getTextInputProps = useCallback(
    (field) => {
      return {
        type: "text",
        name: field,
        placeholder: field,
        defaultValue: state[field],
        onChange: handleChangeInput,
      };
    },
    [state, handleChangeInput]
  );

  // TODO: save uploaded images
  // TODO: allow links to image
  // TODO: input validation
  // TODO: nice tags
  return (
    <FormContainer onSubmit={handleSubmit} onReset={handleReset}>
      <div>
        <TitleInput {...getTextInputProps("title")}></TitleInput>
      </div>
      <div>
        <IntroInput {...getTextInputProps("intro")}></IntroInput>
      </div>
      <div>
        <RemarksInput {...getTextInputProps("remarks")}></RemarksInput>
      </div>
      <div>
        <TagsInput
          placeholder="tags"
          defaultValue={tags}
          onChange={(e) => {
            dispatch({ key: "tags", value: e.target.value.split(",") });
          }}
        />
      </div>
      <BodyContainer>
        <Row>
          <Column span="5">
            <ImageDropZone
              image={state.image}
              onChange={(image) => dispatch({ key: "image", value: image })}
            ></ImageDropZone>
          </Column>
          <Column span="2">
            <EditableIngredients
              items={state.ingredients}
              onChange={(items) =>
                dispatch({ key: "ingredients", value: items })
              }
            ></EditableIngredients>
          </Column>
          <Column span="5">
            <EditableSteps
              items={state.steps}
              onChange={(items) => dispatch({ key: "steps", value: items })}
            ></EditableSteps>
          </Column>
        </Row>
      </BodyContainer>
      <Row>
        <Column span="12">
          <Button type="submit">Save</Button>
          <Button type="reset">Reset</Button>
        </Column>
      </Row>
    </FormContainer>
  );
}
