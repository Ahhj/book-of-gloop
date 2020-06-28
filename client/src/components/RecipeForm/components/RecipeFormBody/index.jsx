import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ImageDropZone from "components/ImageDropZone";
import { Row, Column } from "components/Grid";
import EditableIngredients from "components/EditableIngredients";
import EditableSteps from "components/EditableSteps";
import { BodyContainer } from "components/RecipeContainer/style";

/**
 * Component for the recipe form body.
 * @param {*} props
 */
export default function RecipeFormBody(props) {
  const handleChangeField = useCallback(
    (key, value) => props.onChange({ key, value }),
    []
  );

  const handleChangeImage = (image) => handleChangeField("image", image);

  const handleChangeIngredients = (items) =>
    handleChangeField("ingredients", items);

  const handleChangeSteps = (items) => handleChangeField("steps", items);

  return (
    <BodyContainer>
      <Row>
        <Column span="5">
          <ImageDropZone
            image={props.image}
            onChange={(image) => handleChangeImage(image)}
          ></ImageDropZone>
        </Column>
        <Column span="2">
          <EditableIngredients
            items={props.ingredients}
            onChange={(items) => handleChangeIngredients(items)}
          ></EditableIngredients>
        </Column>
        <Column span="5">
          <EditableSteps
            items={props.steps}
            onChange={(items) => handleChangeSteps(items)}
          ></EditableSteps>
        </Column>
      </Row>
    </BodyContainer>
  );
}

RecipeFormBody.propTypes = {
  image: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  steps: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};
