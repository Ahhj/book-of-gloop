import React from "react";
import { Row, Column } from "../Grid";
import { Title, Intro, Remarks, Tags, Image } from "./style";
import {
  ListContainer,
  ListHeader,
  ListItem,
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
          <Column span={"6"}>
            <Ingredients
              ingredients={ingredients ? ingredients : []}
            ></Ingredients>
          </Column>
        </Row>
        <Row>
          <Column span={`${image ? "12" : "6"}`}>
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
        {ingredients.map(({ quantity, units, name }, index) => (
          <li key={index}>
            {quantity}
            {units ? units : ""} {name}
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
          <ListItem key={index}>{description}</ListItem>
        ))}
      </ol>
    </ListContainer>
  );
}
