import React from "react";
import baking from "assets/images/baking.jpg";
import christmas from "assets/images/christmas.jpg";
import clams from "assets/images/clams.jpg";
import cocktail from "assets/images/cocktail.jpg";
import kitchen from "assets/images/kitchen.jpg";
import { Row, Column } from "components/Grid";
import { Title, Image, Container } from "./style";

export default function Home() {
  return (
    <Row>
      <Column span="3">
        <Image src={clams} alt="" />
        <Image src={christmas} alt="" />
      </Column>
      <Column span="6">
        <Container>
          <Image src={baking} alt="" />
          <Title>The Book of Gloop</Title>
        </Container>
      </Column>
      <Column span="3">
        <Image src={cocktail} alt="" />
        <Image src={kitchen} alt="" />
      </Column>
    </Row>
  );
}
