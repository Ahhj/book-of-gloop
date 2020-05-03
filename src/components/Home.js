import React from "react";
import './Home.css';
import baking from './images/baking.jpg';
import christmas from './images/christmas.jpg';
import clams from './images/clams.jpg';
import cocktail from './images/cocktail.jpg';
import dfo from './images/dfo.jpg';
import kitchen from './images/kitchen.jpg';


export default function Home() {
  return (
    <div className="Home">
      <div className='row' >
        <div className='col'><img src={baking} alt={baking}/></div>
        <div className='col'><img src={christmas} alt={christmas}/></div>
        <div className='col'><img src={clams} alt={clams}/></div>
      </div>
      <h1>The Gloop Collection</h1>
      <div className='row'>
        <div className='col'><img src={cocktail} alt={cocktail}/></div>
        <div className='col'><img src={dfo} alt={dfo}/></div>
        <div className='col'><img src={kitchen} alt={kitchen}/></div>
      </div>
    </div>
  );
}
