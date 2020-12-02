import styled from "styled-components";

export const Title = styled.h1`
  display: block;
  position: absolute;
  color: white;
  text-align: center;
  top: 20%;
  font-size: 100px;
  font-weight: lighter;
  background-color: palevioletred;
  z-index: 10;
`;

export const Image = styled.img`
  position: relative;
  width: 100%;
`;

export const Container = styled.section`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;
