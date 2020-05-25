import styled from "styled-components";
import { Link } from "react-router-dom";

export const RecipeListBody = styled.section`
  display: block;
  position: relative;
  text-align: justify;
`;

export const SearchBar = styled.input`
  width: 100%;
  position: relative;
  display: block;
  text-align: center;
  padding: 1em 1em;
  margin: 0 0 0.5em;
  font-size: 1em;
`;

export const RecipeLink = styled(Link)`
  text-decoration: none;
  padding: 1em 1em;
  color: black;
`;

export const RecipeLinkContainer = styled.div`
  position: relative;
  text-align: left;
  display: block;
  margin: 0 0 0.5em;
  width: 100%;
  border: 1px solid palevioletred;
  padding: 1em 1em;
`;
