import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Recipe from './Recipe'
import Home from './Home'
import './Contents.css'
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";

export default function Contents(props) {
  const links = props.recipes.map(
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

  var routes = props.recipes.map(
    (recipe) =>
      {
        console.log(recipe);
        const path = `/${recipe.name}`;
        const component = () => <Recipe {...recipe}></Recipe>
        return <PrivateRoute
          path={path}
          component={component}
        >
        </PrivateRoute>
      }
  );
  // Append home and contents to routes.
  routes = [
    <Route exact path={"/"}><Home/></Route>,
    <PrivateRoute
      path={"/Contents"}
    >
    {
      <div>
        <div>
          <ol>{links}</ol>
        </div>
        <div>
        <form action="https://docs.google.com/forms/d/e/1FAIpQLSc0iCXAFZ6UH9n3vkWnfvyRWebUiMDkug1Ls5MMHkEZ-AekYg/viewform">
          <input type="submit" value="Add a New Recipe" />
        </form>
        </div>
      </div>
    }
    </PrivateRoute>
  ].concat(routes)
  return (
    <div>
      <header>
          <NavBar/>
      </header>
      <div>
        <Switch>{routes}</Switch>
      </div>
    </div>
  );
}
