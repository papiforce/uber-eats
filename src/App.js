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
import AddProductPage from "pages/AddProductPage";
import AdminPage from "pages/AdminPage";
import CheckoutPage from "pages/CheckoutPage";

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
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/register"
            element={
              <SecurityGuard loggedRedirectionPath="/">
                <RegisterPage />
              </SecurityGuard>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <SecurityGuard loggedRedirectionPath="/">
                <LoginPage />
              </SecurityGuard>
            }
          />
          <Route
            exact
            path="/dashboard/product/form"
            element={
              <SecurityGuard adminRedirectionPath="/">
                <AddProductPage />
              </SecurityGuard>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <SecurityGuard adminRedirectionPath="/">
                <AdminPage />
              </SecurityGuard>
            }
          />
          <Route
            path="/payment"
            element={
              <SecurityGuard>
                <CheckoutPage />
              </SecurityGuard>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
