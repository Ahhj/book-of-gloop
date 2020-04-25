import React from "react";
import {
  Route,
  Link
} from "react-router-dom";
import Page from './Page';
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
        <div className='col'><img src={baking} /></div>
        <div className='col'><img src={christmas} /></div>
        <div className='col'><img src={clams} /></div>
      </div>
      <h1>The Gloop Collection</h1>
      <div className='row'>
        <a href={'/Contents'}>{'Click to enter'}</a>
      </div>
      <div className='row'>
        <div className='col'><img src={cocktail} /></div>
        <div className='col'><img src={dfo} /></div>
        <div className='col'><img src={kitchen} /></div>
      </div>
    </div>
  );
}
