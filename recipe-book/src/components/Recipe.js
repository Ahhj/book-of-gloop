import React, { Component } from "react";
import {
  Route,
  Link
} from "react-router-dom";
import Page from './Page'
import './Recipe.css'

function Ingredients(props) {
  const ingredients = props.content.map((item) =>
    <li>{`${item.name} ${item.quantity}`}</li>
  );
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
    const serves = `Serves: ${this.props.servings ? this.props.servings : ''}`;
    const time = `Time: ${this.props.time ? this.props.time : ''}`;
    const tags = `Tags: ${this.props.tags ? this.props.tags : ''}`;
    return (
      <div>
        <h4>{serves}</h4>
        <h4>{time}</h4>
        <h4>{tags}</h4>
        <div className='row'>
          <Ingredients content={this.props.ingredients}/>
          <Instructions content={this.props.instructions}/>
        </div>
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