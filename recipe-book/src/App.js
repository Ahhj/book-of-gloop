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
      key: '1WAfPfWnmHzPK02RQqWF3D7lQMUdaj00amfAS6ABRoJc',
      callback: data =>
        {
          var recipeData = data.Recipes.elements;
          const instructionData = data.Instructions.elements;
          const ingredientData = data.Ingredients.elements;
          // Attach instructions & ingredients to recipes.
          recipeData.forEach(
            recipe => {
              recipe.name = recipe.Title;
              recipe.tags = recipe.Tags;
              recipe.time = recipe.Time;
              //recipe.servings = recipe.servings;
              recipe.instructions = instructionData.filter(
                instruction => instruction.RecipeId === recipe.Id
              ).map(
                instruction => instruction.Description
              );
              recipe.ingredients = ingredientData.filter(
                ingredient => ingredient.RecipeId === recipe.Id
              ).map(
                ingredient => {
                  return {
                    name: ingredient.Name,
                    quantity: ingredient.Quantity
                  }
                }
              );
            }
          );
          console.log(recipeData);
          this.setState({
            recipes: recipeData
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
