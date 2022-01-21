import React from "react";
import { Row } from "../Grid";
import SummaryPanel from "./components/SummaryPanel";
import {
  Title,
  Intro,
  Remarks,
  Tags,
  Image,
  SummaryPanelContainer,
} from "./style";
import { BodyContainer } from "../RecipeContainer/style";
import {
  ImageContainer,
  StepsContainer,
  IngredientsContainer,
  StyledMarkdown,
} from "./style";

/**
 * Recipe component.
 * @param {*} param0
 */
export default function Recipe({
  title,
  intro,
  remarks,
  duration,
  serves,
  tags,
  image,
  ingredients,
  steps,
}) {
  return (
    <BodyContainer>
      <Title>{title}</Title>
      {!!serves || !!duration ? (
        <SummaryPanelContainer>
          <SummaryPanel serves={serves} duration={duration} />
        </SummaryPanelContainer>
      ) : null}
      {intro ? <Intro>{intro}</Intro> : null}
      {remarks ? <Remarks>{remarks}</Remarks> : null}
      {tags ? <Tags>{(tags ? tags : []).join(",")}</Tags> : null}
      <Row>
        <ImageContainer span={`${image ? "0.7" : "0"}`}>
          <p />
          <Image src={image} />
        </ImageContainer>
        <IngredientsContainer span={"0.3"}>
          <p />
          <StyledMarkdown children={"### Ingredients"} />
          <StyledMarkdown children={ingredients ? ingredients : ""} />
        </IngredientsContainer>
      </Row>
      <Row>
        <StepsContainer span={`${image ? "1" : "0.7"}`}>
          <p />
          <StyledMarkdown children={"### Steps"} />
          <StyledMarkdown children={steps ? steps : ""} />
        </StepsContainer>
      </Row>
    </BodyContainer>
  );
}
