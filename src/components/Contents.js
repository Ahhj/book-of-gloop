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
  function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
  }

  const chapterSections = uniquechaps.map(

      (chapter) =>
        <li>
          {chapter}
            <ul>
            {
              recipes.filter(function(item){
                return item.chapter == chapter;
              }).map(a => a.Title).join(', ')
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
