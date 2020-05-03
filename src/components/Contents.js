import React from "react";
import {
  Switch,
  Link
} from "react-router-dom";
import Recipe from './Recipe'
import './Contents.css'
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Collapsible from 'react-collapsible';

export default function Contents(props) {
  var recipes =  props.recipes

  var allchaps = recipes.map(a => a.chapter);
  var uniquechaps = allchaps.filter((v, i, a) => a.indexOf(v) === i).sort();

  const chapterSections = uniquechaps.map(

      (chapter) =>

        <Collapsible trigger={chapter}>

          <ul>
            {
              recipes.filter(function(item){
                return item.chapter === chapter;
              }).map(
                rec => {
                  const path = `/${rec.name}`;
                  const component = () => <Recipe {...rec}></Recipe>
                  return(
                    <li><Link to={path} style={{textDecoration: 'none'}}>{rec.name}</Link></li>
                  )
              }
              )
            }
          </ul>
        </Collapsible>
    );

  const recipeRoutes = props.recipes.map(
    (recipe) =>
      {
        const path = `/${recipe.name}`;
        const component = () => <Recipe {...recipe}></Recipe>
        return (
          <PrivateRoute
            path={path}
            component={component}
          ></PrivateRoute>)
      }
  );

  return (

    <div>
    <header>
        <NavBar/>
    </header>
      <div>
        <Switch>
        <PrivateRoute
            path={"/Contents"}
          >
          {
            <div>

              <div>
                <ol>{chapterSections}</ol>
              </div>
              <div>
              <form action="https://docs.google.com/forms/d/e/1FAIpQLSc0iCXAFZ6UH9n3vkWnfvyRWebUiMDkug1Ls5MMHkEZ-AekYg/viewform">
                <input type="submit" value="Add a New Recipe" />
              </form>
              </div>
            </div>
          }
          </PrivateRoute>
          {recipeRoutes}
        </Switch>
      </div>
    </div>
  );
}
