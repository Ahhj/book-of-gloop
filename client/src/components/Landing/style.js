import styled from "styled-components";

export const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 9vw;
  font-weight: lighter;
  background-color: palevioletred;
  margin: 0px;
`;

export const TitleContainer = styled.div`
  z-index: 10;
  position: fixed;
  justify-content: center;
  width: 100%;
`;

export const Image = styled.img`
  position: relative;
  margin: 0px;
`;

export const Container = styled.section`
  width: 50vw;

  @media only screen and (max-width: 800px) {
    width: 100vw;
  }

  padding-top: 10%;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

export const ImageRow = styled.div`
  width: 100%;
  position: relative;
  display: block;
  font-size: 0;
`;
