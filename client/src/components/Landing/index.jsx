import React from "react";
import baking from "assets/images/baking.jpg";
import baking2 from "assets/images/baking2.jpg";
import christmas from "assets/images/christmas.jpg";
import clams from "assets/images/clams.jpg";
import washing from "assets/images/washing.jpg";
import cocktail from "assets/images/cocktail.jpg";
import kitchen from "assets/images/kitchen.jpg";
import { Title, Container } from "./style";

import { ReactPhotoCollage } from "react-photo-collage";

export default function Landing() {
  const setting = {
    width: "100%",
    height: ["400px", "400px", "400px", "400px"],
    layout: [1, 2, 1, 2],
    photos: [
      { src: baking },
      { src: washing },
      { src: clams },
      { src: baking2 },
      { src: christmas },
      { src: cocktail },
    ],
    showNumOfRemainingPhotos: false,
  };

  return (
    <section
      style={{
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${kitchen})`,
      }}
    >
      <Container>
        <Title>The Book of Gloop</Title>
        <ReactPhotoCollage {...setting} />
      </Container>
    </section>
  );
}
