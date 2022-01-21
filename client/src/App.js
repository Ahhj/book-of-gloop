import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import RequireAuth from "./components/RequireAuth";
import RecipeListContainer from "./components/RecipeListContainer";
import RecipeContainer from "./components/RecipeContainer";
import { AuthNavBar } from "./components/NavBar";

const Logout = () => {
  const { logout } = useAuth0();
  logout({ returnTo: window.location.origin });
  return <React.Fragment />;
};

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect({ redirect_uri: `${window.location.origin}/` });
  return <React.Fragment />;
};

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div> Loading... </div>;
  } else {
    return (
      <Router>
        <div className="App">
          <AuthNavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="contents"
              element={
                <RequireAuth>
                  <RecipeListContainer />
                </RequireAuth>
              }
            />
            <Route
              key={"recipe-route"}
              path={`recipe/:recipeId`}
              element={
                <RequireAuth>
                  <RecipeContainer />
                </RequireAuth>
              }
            />
            <Route
              key={"new-recipe-route"}
              path={`recipe/new`}
              element={
                <RequireAuth>
                  <RecipeContainer />
                </RequireAuth>
              }
            />
            <Route path={"login"} element={<Login />} />
            <Route path={"logout"} element={<Logout />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
