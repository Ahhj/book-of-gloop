import React from "react";
import { Row, Column } from "../Grid";
import { Title, Intro, Remarks, Tags, Image } from "./style";
import { BodyContainer } from "../RecipeContainer/style";
import MDEditor from "@uiw/react-md-editor";

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
        <Column span={`${image ? "6" : "0"}`}>
          <span />
          <Image src={image} />
        </Column>
        <Column span={"6"}>
          <span />
          <MDEditor.Markdown source={"### Ingredients"} />
          <MDEditor.Markdown source={ingredients ? ingredients : ""} />
        </Column>
      </Row>
      <Row>
        <Column span={`${image ? "12" : "6"}`}>
          <span />
          <MDEditor.Markdown source={"### Steps"} />
          <MDEditor.Markdown source={steps ? steps : ""} />
        </Column>
      </Row>
    </BodyContainer>
  );
}
