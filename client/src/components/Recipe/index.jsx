import React from "react";
import { Row, Column } from "../Grid";
import { Title, Intro, Remarks, Tags, Image } from "./style";
import {
  ListContainer,
  ListHeader,
  ListItem,
  BodyContainer,
  SubListHeader,
  OrderedList,
  UnorderedList,
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
    <BodyContainer>
      <Title>{title}</Title>
      {intro ? <Intro>{intro}</Intro> : null}
      {remarks ? <Remarks>{remarks}</Remarks> : null}
      {tags ? <Tags>{(tags ? tags : []).join(",")}</Tags> : null}
      <Row>
        <Column span={`${image ? "6" : "0"}`}>
          <Image src={image} />
        </Column>
        <Column span={"6"}>
          <IngredientList items={ingredients ? ingredients : []} />
        </Column>
      </Row>
      <Row>
        <Column span={`${image ? "12" : "6"}`}>
          <StepList items={steps ? steps : []} />
        </Column>
      </Row>
    </BodyContainer>
  );
}

function IngredientList(props) {
  return (
    <ListOfLists
      header={"Ingredients"}
      isOrdered={false}
      ListItemComponent={IngredientItemComponent}
      {...props}
    />
  );
}

function StepList(props) {
  return (
    <ListOfLists
      header={"Steps"}
      isOrdered={true}
      ListItemComponent={StepItemComponent}
      {...props}
    />
  );
}

function IngredientItemComponent({ key, quantity, units, name }) {
  return (
    <ListItem key={key}>
      {quantity}
      {units ? units : ""} {name}
    </ListItem>
  );
}

function StepItemComponent({ key, description }) {
  return <ListItem key={key}>{description}</ListItem>;
}

function ListOfLists({
  items,
  header,
  isSubList,
  isOrdered,
  ListItemComponent,
}) {
  const HeaderComponent = !isSubList ? ListHeader : SubListHeader;
  const ListComponent = isOrdered ? OrderedList : UnorderedList;
  return (
    <ListContainer>
      <ListComponent>
        <HeaderComponent>{header}</HeaderComponent>
        {items.map((item, index) =>
          item.items ? (
            <ListOfLists
              isSubList={true}
              header={item.header}
              items={item.items}
              isOrdered={isOrdered}
              ListItemComponent={ListItemComponent}
            />
          ) : (
            <ListItemComponent key={index} {...item} />
          )
        )}
      </ListComponent>
    </ListContainer>
  );
}
