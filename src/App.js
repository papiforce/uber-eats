import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";

import { AuthContext } from "contexts/AuthContext";
import { useCurrentUser } from "api/authQueries";

import SecurityGuard from "pages/layouts/SecurityGuard";

import HomePage from "pages/HomePage";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import AdminPage from "pages/AdminPage";


const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: Cookies.get("fe-token") ? true : false,
    user: null,
  });

  const onSuccess = (payload) => {
    setAuth({ isAuthenticated: true, user: payload });
  };

  const onError = () => {
    Cookies.remove("fe-token");
    setAuth({ isAuthenticated: false, user: null });
  };

  const { isLoading } = useCurrentUser(onSuccess, onError);

  if (isLoading) return <>LOADING...</>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <SecurityGuard loggedRedirectionPath="/">
                <RegisterPage />
              </SecurityGuard>
            }
          />
          <Route
            path="/login"
            element={
              <SecurityGuard loggedRedirectionPath="/">
                <LoginPage />
              </SecurityGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <SecurityGuard>
                <AdminPage />
              </SecurityGuard>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
