import React from "react";
import { useGoogleOAuth } from "./react-google-oauth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import RequireAuth from "./components/RequireAuth";
import RecipeListContainer from "./components/RecipeListContainer";
import RecipeContainer from "./components/RecipeContainer";
import { AuthNavBar } from "./components/NavBar";

const Logout = () => {
  const { logout } = useGoogleOAuth();
  logout().then(() => {
    window.location.href = "/";
  });
  return <React.Fragment />;
};

const Login = () => {
  const { login } = useGoogleOAuth();
  login().then(() => {
    window.location.href = "/";
  });
  return <React.Fragment />;
};

function App() {
  const { loading, isAuthenticated } = useGoogleOAuth();

  if (loading) {
    return <div> Loading... </div>;
  } else {
    return (
      <Router>
        <div className="App">
          <AuthNavBar isAuthenticated={isAuthenticated} />
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
