import styled from "styled-components";

export const Title = styled.h1`
  text-align: center;
  font-size: 60px;
  font-weight: lighter;
`;

export const Intro = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: lighter;
`;

export const Remarks = styled.h2`
  text-align: center;
  font-size: 14px;
  font-weight: lighter;
`;

export const Tags = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

export const Image = styled.img`
  width: 100%;

  @media only screen and (min-width: 600px) {
    width: 95%;
    padding-right: 5%;
  }
`;

export const ImageContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 300px) {
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
  }
  @media only screen and (min-width: 600px) {
    float: left;
    width: 50%;
  }
`;

export const IngredientsContainer = styled.div`
  display: block;
  text-align: left;

  @media only screen and (min-width: 300px) {
    float: left;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    align-items: center;
    justify-content: center;
    width: 50%;
  }
`;

export const StepsContainer = styled.div`
  width: 100%;
  text-align: left;
  float: left;
  align-items: center;
`;
