import React from "react";
import baking from "assets/images/baking.jpg";
import baking2 from "assets/images/baking2.jpg";
import christmas from "assets/images/christmas.jpg";
import clams from "assets/images/clams.jpg";
import washing from "assets/images/washing.jpg";
import cocktail from "assets/images/cocktail.jpg";
import kitchen from "assets/images/kitchen.jpg";
import { Title, TitleContainer, Container, Image, ImageRow } from "./style";

export default function Landing() {
  return (
    <div>
      <section
        style={{
          width: "100vw",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          margin: 0,
          padding: 0,
          backgroundImage: `url(${kitchen})`,
        }}
      >
        <TitleContainer>
          <Title>The Book of Gloop</Title>
        </TitleContainer>
        <Container>
          <ImageRow>
            <Image style={{ width: "100%" }} src={baking} />
          </ImageRow>
          <ImageRow>
            <Image style={{ width: "50%" }} src={washing} />
            <Image style={{ width: "50%" }} src={clams} />
          </ImageRow>
          <ImageRow>
            <Image style={{ width: "100%" }} src={baking2} />
          </ImageRow>
          <ImageRow>
            <Image style={{ width: "50%" }} src={cocktail} />
            <Image style={{ width: "50%" }} src={christmas} />
          </ImageRow>
        </Container>
      </section>
    </div>
  );
}
