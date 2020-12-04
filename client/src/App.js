import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "components/Landing";
import PrivateRoute from "components/PrivateRoute";
import RecipeListContainer from "components/RecipeListContainer";
import RecipeContainer from "components/RecipeContainer";
import { AuthNavBar } from "components/NavBar";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div> Loading... </div>;
  } else {
    return (
      <Router>
        <div className="App">
          <AuthNavBar />
          <Switch>
            <PrivateRoute
              path="/contents"
              component={() => <RecipeListContainer />}
            />
            <PrivateRoute
              key={"recipe-route"}
              path={`/recipe/:recipeId`}
              component={() => <RecipeContainer />}
            />
            <PrivateRoute
              key={"new-recipe-route"}
              path={`/recipe/new`}
              component={() => <RecipeContainer />}
            />
            <Route exact path={"/"}>
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
