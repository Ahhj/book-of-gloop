import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactMde from "react-mde";
import ImageDropZone from "components/ImageDropZone";
import { Row } from "components/Grid";
import {
  ImageContainer,
  StepsContainer,
  IngredientsContainer,
  StyledMarkdown,
} from "components/Recipe/style";

import "react-mde/lib/styles/css/react-mde-all.css";

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
  const [selectedTab, setSelectedTab] = useState("write");
  const generateMarkdownPreview = (markdown) =>
    Promise.resolve(<StyledMarkdown source={markdown} />);
  const toolbarCommands = [
    ["header", "bold", "italic", "strikethrough"],
    ["link"],
    ["unordered-list", "ordered-list"],
  ];

  return (
    <div>
      <Row>
        <ImageContainer span={"0.7"}>
          <p />
          <ImageDropZone
            image={image}
            onChange={(value) => onChange({ key: "image", value })}
          ></ImageDropZone>
        </ImageContainer>
        <IngredientsContainer span={"0.3"}>
          <p />
          <StyledMarkdown source={"### Ingredients"} />
          <ReactMde
            value={ingredients}
            selectedTab={selectedTab}
            onChange={(value) => onChange({ key: "ingredients", value })}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={generateMarkdownPreview}
            toolbarCommands={toolbarCommands}
          ></ReactMde>
        </IngredientsContainer>
      </Row>
      <Row>
        <StepsContainer>
          <p />
          <StyledMarkdown source={"### Steps"} />
          <ReactMde
            value={steps}
            selectedTab={selectedTab}
            onChange={(value) => onChange({ key: "steps", value })}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={generateMarkdownPreview}
            toolbarCommands={toolbarCommands}
          ></ReactMde>
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
