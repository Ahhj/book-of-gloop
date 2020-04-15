import React, { Component } from "react";
import {
  Route,
  Link
} from "react-router-dom";
import Page from './Page'
import './Recipe.css'

function Ingredients(props) {
  const ingredients = props.content.map((item) => <li>{item}</li>);
  return (
    <div className='column'>
      <h2>{'Ingredients'}</h2>
      <ul>
        {
          ingredients
        }
      </ul>
    </div>
  )
}

function Instructions(props) {
  const instructions = props.content.map((item) => <li>{item}</li>);
  return (
    <div className='column'>
      <h2>{'Instructions'}</h2>
      <ol>
        {
          instructions
        }
      </ol>
    </div>
  )
}

export default class Recipe extends Component {
  renderContent() {
    return (
      <div className='row'>
        <Ingredients content={this.props.ingredients}/>
        <Instructions content={this.props.instructions}/>
      </div>
    )
  }

  render() {
    return (
      <div className="Recipe">
        <Page name={this.props.name} content={this.renderContent()} />
        <Route>
          <Link to={'/Contents'}>{'Go to contents'}</Link>
        </Route>
      </div>
    );
  }
}