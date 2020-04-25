// https://docs.google.com/spreadsheets/d/e/2PACX-1vSDlXkDTivQ5hcGkcFJzsBpZOVZKoeJakcpkHnfERns96CKHoVeWyrgpsomZzYfGEC8NhrgEGmOgUdW/pubhtml

import React, { useState, useEffect } from 'react';
import './App.css';
import Tabletop from 'tabletop';
import Contents from './components/Contents'
import {
  useAuth0
} from "./react-auth0-spa";
import {
  BrowserRouter as Router
} from "react-router-dom";
import history from "./utils/history";

function App() {
  const [recipes, setRecipes] = useState([]);
  const { loading } = useAuth0();

  useEffect(() => {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1xxwUBoZ1bm2O_0eX4Ltz5P9SDq8-XiCQIM28VdOtOAU/edit?usp=sharing',
      callback: data =>
        {
          var recipes = data.Responses.elements;
          // Attach instructions & ingredients to recipes.
          recipes.forEach(
            recipe => {
              recipe.name = recipe.Title;
              recipe.tags = recipe.Tags.split(";");
              recipe.time = recipe.Span;
              recipe.servings = recipe.Volume;
              recipe.instructions = recipe.Directions.split(";");
              recipe.image = recipe.Image_Link
              recipe.ingredients = recipe.Components.split(";").map(item =>
                {
                  const name = item.match(/(.*?)(?![^\(])/g);
                  const quantity = item.match(/\(([^()]+)\)/);
                  return {
                    name: name ? name[0] : '',
                    quantity: quantity ? quantity[0] : '',
                  }
                }
              );
            }
          );
          setRecipes(recipes)
        },
      simpleSheet: false,
      parseNumbers: true
    })
  })

  if (loading) {
    return <div > Loading... </div>;
  } else {
    return (
      <div>
        <div className="App">
          <Router history={history}>
            <Contents recipes={recipes}/>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
