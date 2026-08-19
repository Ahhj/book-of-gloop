// src/react-google-oauth.js
import React, { useState, useEffect, useContext } from "react";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const GoogleOAuthContext = React.createContext();
export const useGoogleOAuth = () => useContext(GoogleOAuthContext);

export const GoogleOAuthProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load Google API client library
  useEffect(() => {
    const loadGoogleAPI = () => {
      // Check if Google API is already loaded
      if (window.gapi) {
        initClient();
        return;
      }

      // Load Google API client library
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        window.gapi.load("client:auth2", initClient);
      };
      script.onerror = () => {
        console.error("Failed to load Google API");
        setLoading(false);
      };
      document.body.appendChild(script);
    };

    const initClient = () => {
      const clientId = initOptions.clientId;
      const scope = initOptions.scope || "email profile https://www.googleapis.com/auth/drive.readonly";
      
      window.gapi.client.init({
        clientId: clientId,
        scope: scope,
        plugin_name: "book-of-gloop",
      }).then(() => {
        // Check if user is already signed in
        const authInstance = window.gapi.auth2.getAuthInstance();
        const isSignedIn = authInstance.isSignedIn.get();
        
        if (isSignedIn) {
          const user = authInstance.currentUser.get();
          const profile = user.getBasicProfile();
          const authResponse = user.getAuthResponse();
          
          setUser({
            id: profile.getId(),
            email: profile.getEmail(),
            name: profile.getName(),
            picture: profile.getImageUrl(),
          });
          setToken(authResponse.access_token);
          setIsAuthenticated(true);
        }
        
        setLoading(false);
        
        // Listen for sign-in state changes
        authInstance.isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            const user = authInstance.currentUser.get();
            const profile = user.getBasicProfile();
            const authResponse = user.getAuthResponse();
            
            setUser({
              id: profile.getId(),
              email: profile.getEmail(),
              name: profile.getName(),
              picture: profile.getImageUrl(),
            });
            setToken(authResponse.access_token);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
          }
        });
      }).catch((error) => {
        console.error("Google API init error:", error);
        setLoading(false);
      });
    };

    loadGoogleAPI();
    
    return () => {
      // Cleanup
    };
    // eslint-disable-next-line
  }, []);

  const login = async (params = {}) => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    try {
      await authInstance.signIn({
        scope: params.scope || "email profile https://www.googleapis.com/auth/drive",
        prompt: params.prompt || "select_account",
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    await authInstance.signOut();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const getToken = async () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      throw new Error("Not authenticated");
    }
    const user = authInstance.currentUser.get();
    const authResponse = user.getAuthResponse();
    return authResponse.access_token;
  };

  return (
    <GoogleOAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        token,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </GoogleOAuthContext.Provider>
  );
};
