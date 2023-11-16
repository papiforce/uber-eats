import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { OrderContext } from "contexts/OrderContext";
import { useCurrentUser } from "api/authQueries";

import SecurityGuard from "pages/layouts/SecurityGuard";
import HomePage from "pages/HomePage";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import AddProductPage from "pages/AddProductPage";
import AdminPage from "pages/AdminPage";
import CurrentCommand from "pages/CurrentCommand";

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: Cookies.get("fe-token") ? true : false,
    user: null,
  });

  const [orderConfirmed, setorderConfirmed] = useState(null);

  const onSuccess = (payload) => {
    setAuth({ isAuthenticated: true, user: payload });
  };

  const onError = () => {
    Cookies.remove("fe-token");
    setAuth({ isAuthenticated: false, user: null });
  };

  const { isLoading } = useCurrentUser(onSuccess, onError);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchLatestOrder = async () => {
        const access_token = Cookies.get('fe-token');
  
        return (await axios.get(
          "http://localhost:4400/api/orders/latest",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + access_token,
            },
          }
        ));
      };
  
      const updateOrder = async () => {
        const response = await fetchLatestOrder();
        if (response.data.success) {
          setorderConfirmed(response.data);
        }
      };
  
      setTimeout(()=>{
        updateOrder();
      },3000)
    }
  }, [auth.isAuthenticated]);

  if (isLoading) return <>LOADING...</>;

  

  return (
    
    <AuthContext.Provider value={{ auth, setAuth }}>
      <OrderContext.Provider value={{ orderConfirmed, setorderConfirmed }}>
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
            path="/order"
            element={
                <CurrentCommand />
            }
          />
          <Route
            path="/addProduct"
            element={
              // <SecurityGuard loggedRedirectionPath="/">
              <AddProductPage />
              // </SecurityGuard>
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
      </OrderContext.Provider>
    </AuthContext.Provider>

  );
};

export default App;
