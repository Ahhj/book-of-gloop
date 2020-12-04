import React from "react";
import PropTypes from "prop-types";
import MDEditor, { commands } from "@uiw/react-md-editor";
import ImageDropZone from "components/ImageDropZone";
import { Row } from "components/Grid";
import {
  ImageContainer,
  StepsContainer,
  IngredientsContainer,
  MarkdownArea,
} from "components/Recipe/style";

/**
 * Component for the recipe form body.
 * @param {*} props
 */
export default function RecipeFormBody({
  image,
  ingredients,
  steps,
  onChange,
}) {
  const markdownCommands = [
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.link,
    commands.orderedListCommand,
    commands.unorderedListCommand,
    commands.checkedListCommand,
    commands.codeEdit,
    commands.codeLive,
    commands.codePreview,
    commands.fullscreen,
  ];
  return (
    <div>
      <Row>
        <ImageContainer>
          <p />
          <ImageDropZone
            image={image}
            onChange={(value) => onChange({ key: "image", value })}
          ></ImageDropZone>
        </ImageContainer>
        <IngredientsContainer>
          <p />
          <MarkdownArea source={"### Ingredients"} />
          <MDEditor
            value={ingredients}
            onChange={(value) => onChange({ key: "ingredients", value })}
            preview={"edit"}
            commands={markdownCommands}
          ></MDEditor>
        </IngredientsContainer>
      </Row>
      <Row>
        <StepsContainer>
          <p />
          <MarkdownArea source={"### Steps"} />
          <MDEditor
            value={steps}
            onChange={(value) => onChange({ key: "steps", value })}
            preview={"edit"}
            commands={markdownCommands}
          ></MDEditor>
        </StepsContainer>
      </Row>
    </div>
  );
}

RecipeFormBody.propTypes = {
  image: PropTypes.string,
  ingredients: PropTypes.string,
  steps: PropTypes.string,
  onChange: PropTypes.func,
};
