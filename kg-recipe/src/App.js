// https://docs.google.com/spreadsheets/d/e/2PACX-1vSDlXkDTivQ5hcGkcFJzsBpZOVZKoeJakcpkHnfERns96CKHoVeWyrgpsomZzYfGEC8NhrgEGmOgUdW/pubhtml

import React, { Component } from 'react';
import './App.css';
import Tabletop from 'tabletop';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    Tabletop.init({
      key: '1WAfPfWnmHzPK02RQqWF3D7lQMUdaj00amfAS6ABRoJc',
      callback: (googleData) =>
        {
          console.log(googleData.Recipes.elements)
          this.setState({ data: googleData.Recipes.elements })
        },
      simpleSheet: false
    })
  }

  // thetext() {
  // ('li').each(function() {
  // var listItem = (this),
  // text =  listItem.text().replace(/\*/g, '<li>');
  //
  // listItem.html(text);
  // })
  // }


  render() {
    const { data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Its our recipes yo!</h1>
        </header>


        <div id="employee-details" align="left">
          {
            data.map((obj) => {

              return (
                <div key={obj.Title} id={obj.Title} align="center">
                  <h2>{obj.Title}</h2>
                  <p>Serves: {obj.servings}, Time: {obj.Time}</p>
                  <h4>{obj.tags}</h4>
                  <p>{obj.intro}</p>
                  <img alt={obj.img} src={obj.img} width="500" height="500"/>
                  <p><i>{obj.Notes}</i></p>
                </div>



              )

            })

          }
        </div>
      </div>
    );
  }

}

export default App;
