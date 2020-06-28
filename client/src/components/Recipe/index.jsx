import React from "react";
import { Row, Column } from "../Grid";
import { Title, Intro, Remarks, Tags, Image } from "./style";
import {
  ListContainer,
  ListHeader,
  BodyContainer,
} from "../RecipeContainer/style";

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
    <div>
      <Title>{title}</Title>
      {intro ? <Intro>{intro}</Intro> : null}
      {remarks ? <Remarks>{remarks}</Remarks> : null}
      {tags ? <Tags>{(tags ? tags : []).join(",")}</Tags> : null}
      <BodyContainer>
        <Row>
          <Column span={`${image ? "6" : "0"}`}>
            <Image src={image}></Image>
          </Column>
          <Column span={`${image ? "2" : "4"}`}>
            <Ingredients
              ingredients={ingredients ? ingredients : []}
            ></Ingredients>
          </Column>
          <Column span={`${image ? "4" : "8"}`}>
            <Steps steps={steps ? steps : []}></Steps>
          </Column>
        </Row>
      </BodyContainer>
    </div>
  );
}

function Ingredients({ ingredients }) {
  return (
    <ListContainer>
      <ul>
        <ListHeader>Ingredients</ListHeader>
        {ingredients.map(({ quantity, name }, index) => (
          <li key={index}>
            {quantity} {name}
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}

function Steps({ steps }) {
  return (
    <ListContainer>
      <ol>
        <ListHeader>Steps</ListHeader>
        {steps.map(({ description }, index) => (
          <li key={index}>{description}</li>
        ))}
      </ol>
    </ListContainer>
  );
}
