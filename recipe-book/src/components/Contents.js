import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page from './Page'
import Recipe from './Recipe'
import Home from './Home'
import './Contents.css'

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
      <Route exact path={`/${recipe.name}`}>
        <Recipe
          name={recipe.name}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          time={recipe.time}
          tags={recipe.tags}
          notes={recipe.notes}
          serves={recipe.serves}
        />
      </Route>
  );
  // Append home and contents to routes.
  routes = [
    <Route exact path={"/"}><Home /></Route>,
    <Route exact path={"/Contents"}><Page name={"Contents"} content={<ol>{links}</ol>}/></Route>
  ].concat(routes)
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>{routes}</Switch>
      </div>
    </Router>
  );
}
