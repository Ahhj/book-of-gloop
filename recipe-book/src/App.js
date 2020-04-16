// https://docs.google.com/spreadsheets/d/e/2PACX-1vSDlXkDTivQ5hcGkcFJzsBpZOVZKoeJakcpkHnfERns96CKHoVeWyrgpsomZzYfGEC8NhrgEGmOgUdW/pubhtml

import React, { Component } from 'react';
import './App.css';
import Tabletop from 'tabletop';
import Contents from './components/Contents'

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: []
    }
  }
  componentDidMount() {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1xxwUBoZ1bm2O_0eX4Ltz5P9SDq8-XiCQIM28VdOtOAU/edit?usp=sharing',
      callback: data =>
        {
          var recipes = data.Responses.elements;
          // Attach instructions & ingredients to recipes.
          recipes.forEach(
            recipe => {
              recipe.name = recipe.Designation;
              recipe.tags = recipe.Descriptors;
              recipe.time = recipe.Time;
              recipe.servings = recipe.Volume;
              recipe.instructions = recipe.Directions.split("/");
              recipe.ingredients = recipe.Components.split("/").map(item =>
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
          console.log(data)
          this.setState({
            recipes: recipes
          })
        },
      simpleSheet: false,
      parseNumbers: true
    })
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="App">
        <Contents recipes={recipes}/>
      </div>
    );
  }

}

export default App;
