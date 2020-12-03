import React from "react";
import PropTypes from "prop-types";
import MDEditor, { commands } from "@uiw/react-md-editor";
import ImageDropZone from "components/ImageDropZone";
import { Row, Column } from "components/Grid";
import { BodyContainer } from "./style";

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
    <BodyContainer>
      <Row>
        <Column span="6">
          <ImageDropZone
            image={image}
            onChange={(value) => onChange({ key: "image", value })}
          ></ImageDropZone>
        </Column>
        <Column span="6">
          <MDEditor.Markdown source={"### Ingredients"} />
          <MDEditor
            value={ingredients}
            onChange={(value) => onChange({ key: "ingredients", value })}
            preview={"edit"}
            commands={markdownCommands}
          ></MDEditor>
        </Column>
      </Row>
      <Row>
        <Column span="12">
          <MDEditor.Markdown source={"### Steps"} />
          <MDEditor
            value={steps}
            onChange={(value) => onChange({ key: "steps", value })}
            preview={"edit"}
            commands={markdownCommands}
          ></MDEditor>
        </Column>
      </Row>
    </BodyContainer>
  );
}

RecipeFormBody.propTypes = {
  image: PropTypes.string,
  ingredients: PropTypes.string,
  steps: PropTypes.string,
  onChange: PropTypes.func,
};
