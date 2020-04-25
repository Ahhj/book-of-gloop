import React, { Component } from "react";
import Page from './Page'
import './Recipe.css'

function Ingredients(props) {
  const ingredients = props.content.map((item) =>
    <li>{`${item.name} ${item.quantity}`}</li>
  );
  const servings = `Serves: ${props.servings ? props.servings : ''}`;
  const time = `Time: ${props.time ? props.time : ''}`;
  const tags = `Tags: ${props.tags ? props.tags : ''}`;
  return (
    <div className='column'>
    <h4>{servings}</h4>
    <h4>{time}</h4>
    <h4>{tags}</h4>
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
  const instructions = props.instructions.map((item) => <li>{item}</li>);
  const imge = props.image;
  return (
    <div className='column'>
      <img src={imge} alt={imge} />
      <h2>{'Instructions'}</h2>
      <ol>
        {instructions}
      </ol>
    </div>
  )
}

export default class Recipe extends Component {
  renderContent() {
    return (
      <div>
        <div className='row'>
          <Ingredients content={this.props.ingredients} servings={this.props.servings} time={this.props.time} tags={this.props.tags}/>
          <Instructions instructions={this.props.instructions} image={this.props.image}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Recipe">
        <Page name={this.props.name} content={this.renderContent()} />
      </div>
    );
  }
}
