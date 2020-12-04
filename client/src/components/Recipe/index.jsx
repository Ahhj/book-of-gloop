import React from "react";
import { Row } from "../Grid";
import { Title, Intro, Remarks, Tags, Image } from "./style";
import { BodyContainer } from "../RecipeContainer/style";
import {
  ImageContainer,
  StepsContainer,
  IngredientsContainer,
  MarkdownArea,
} from "./style";

/**
 * Recipe component.
 * @param {*} param0
 */
export default function Recipe({
  title,
  intro,
  remarks,
  tags,
  image,
  ingredients,
  steps,
}) {
  return (
    <BodyContainer>
      <Title>{title}</Title>
      {intro ? <Intro>{intro}</Intro> : null}
      {remarks ? <Remarks>{remarks}</Remarks> : null}
      {tags ? <Tags>{(tags ? tags : []).join(",")}</Tags> : null}
      <Row>
        <ImageContainer span={`${image ? "6" : "0"}`}>
          <p />
          <Image src={image} />
        </ImageContainer>
        <IngredientsContainer span={"6"}>
          <p />
          <MarkdownArea source={"### Ingredients"} />
          <MarkdownArea source={ingredients ? ingredients : ""} />
        </IngredientsContainer>
      </Row>
      <Row>
        <StepsContainer span={`${image ? "12" : "6"}`}>
          <p />
          <MarkdownArea source={"### Steps"} />
          <MarkdownArea source={steps ? steps : ""} />
        </StepsContainer>
      </Row>
    </BodyContainer>
  );
}
