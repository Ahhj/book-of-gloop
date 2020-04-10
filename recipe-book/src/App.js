import React from 'react';
import './App.css';
import Contents from './components/Contents'

const recipes = [
  {
    name: 'Test',
    ingredients: [
      'blah blah blah',
    ],
    instructions: [
      'mix the slop'
    ]
  },
  {
    name: 'Test2',
    ingredients: [
      'bob lob law'
    ],
    instructions: [
      'pour the slop'
    ]
  }
];

function App() {
  return (
    <div className="App">
      <Contents recipes={recipes}/>
    </div>
  );
}

export default App;
