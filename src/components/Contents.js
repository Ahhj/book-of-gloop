import React from "react";
import {
  Switch,
  Link
} from "react-router-dom";
import Recipe from './Recipe'
import './Contents.css'
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";

export default function Contents(props) {
  // const allchaps = ['gloopy gloop', 'sloppy slop', 'gloopy slop', 'sloppy gloop'];
  var recipes = [{
    "chapter" : "Vegeterian",
    "address" : "32 street, london",
    "Title" : 'Gloopy gloop'
    },{
    "chapter" : "Vegeterian",
    "address" : "51 street, new york",
    "Title" : 'Sloppy slop',
    "gender" : "male"
},{
    "chapter" : "Chicken",
    "address" : "14th street, birmingham",
    "Title" : 'Gloopy slop',
    "gender" : "male"
},{
    "chapter" : "Pudding",
    "address" : "89th street, manchester",
    "Title" : 'Sloppy Gloop'
},{
    "chapter": "Pudding",
    "address": "6th street, Washington",
    "Title": 'Slopity gloop gloop'
},{
    "chapter": "Baking",
    "address": "4th street, VA",
    "Title": 'Gloopity slop slop',
    "gender": "male"
}
];



  var allchaps = recipes.map(a => a.chapter);
  var uniquechaps = allchaps.filter((v, i, a) => a.indexOf(v) === i).sort();

  function myFunction(a) {
    var m = []
    for (var i = 0; i < a.length; i += 1){
        m[i] = '<li>' + a[i] + '</li>';
    }
    return m;             // Function returns the product of a and b
  }


  const chapterSections = uniquechaps.map(

      (chapter) =>
        <li>
            {chapter}
              <ul>
              {
                recipes.filter(function(item){
                  return item.chapter == chapter;
                }).map(a => <li>{a.Title}</li>)
              }
            </ul>
        </li>

    );
  //var chap = allchaps.filter((v, i, a) => a.indexOf(v) === i);
  // const recipeLinks = uniquechaps.map(
  //     (recipe) =>
  //       <li>
  //         <p> {recipe} </p>
  //       </li>
  //
  // );
  //
  // const recipeRoutes = props.recipes.map(
  //   (recipe) =>
  //     {
  //       const path = `/${recipe.name}`;
  //       const component = () => <Recipe {...recipe}></Recipe>
  //       return (
  //         <PrivateRoute
  //           path={path}
  //           component={component}
  //         ></PrivateRoute>)
  //     }
  // );

  return (

    <div>
      <div>
        <ul> {chapterSections} </ul>
      </div>
    </div>
  );
}
