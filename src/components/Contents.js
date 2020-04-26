import React from "react";
import {
  Switch,
  Link
} from "react-router-dom";
import Recipe from './Recipe'
import './Contents.css'
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";

export default function Contents(props) {
  const recipeLinks = props.recipes.map(
    (recipe) =>
      <li>
        <Link
          to={`/${recipe.name}`}
          style={{ textDecoration: 'none' }}
        >
          {recipe.name}
        </Link>
      </li>

  );

  const recipeRoutes = props.recipes.map(
    (recipe) =>
      {
        const path = `/${recipe.name}`;
        const component = () => <Recipe {...recipe}></Recipe>
        return (
          <PrivateRoute
            path={path}
            component={component}
          ></PrivateRoute>)
      }
  );

  return (
    <div>
      <header>
          <NavBar/>
      </header>
      <div>
        <Switch>
          <PrivateRoute
            path={"/Contents"}
          >
          {
            <div>
              <div>
                <ol>{recipeLinks}</ol>
              </div>
              <div>
              <form action="https://docs.google.com/forms/d/e/1FAIpQLSc0iCXAFZ6UH9n3vkWnfvyRWebUiMDkug1Ls5MMHkEZ-AekYg/viewform">
                <input type="submit" value="Add a New Recipe" />
              </form>
              </div>
            </div>
          }
          </PrivateRoute>
          {recipeRoutes}
        </Switch>
      </div>
    </div>
  );
}
