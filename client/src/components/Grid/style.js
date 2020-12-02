import styled from "styled-components";

export const Row = styled.div`
    &::after {
    content: "",
    clear: both;
    display: table;
    }
`;

export const Column = styled.div`
  width: 100%;
  text-align: left;
  float: left;

  @media only screen and (min-width: 400px) {
    width: ${(props) => (props.span ? (props.span / 6) * 100 : "8.33")}%;
  }
  @media only screen and (min-width: 600px) {
    width: ${(props) => (props.span ? (props.span / 8) * 100 : "8.33")}%;
  }
  @media only screen and (min-width: 800px) {
    width: ${(props) => (props.span ? (props.span / 12) * 100 : "8.33")}%;
  }

`;
