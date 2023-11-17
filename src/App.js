import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
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
import CheckoutPage from "pages/CheckoutPage";
import ProductListPage from "pages/ProductListPage";
import UsersListPage from "pages/UsersListPage";
import DeliveryPage from "pages/DeliveryPage";
import DeliveryOrdersPage from "pages/DeliveryOrdersPage";
import OrderListPage from "pages/OrderListPage";
import { useGetLatestOrder } from "api/orderQueries";
import OrderListAdmin from "pages/OrderListAdminPage";

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: Cookies.get("fe-token") ? true : false,
    user: null,
  });
  const [latestOrder, setLatestOrder] = useState(null);

  const onGetCurrentUserSuccess = (payload) => {
    setAuth({ isAuthenticated: true, user: payload });
  };

  const onError = () => {
    Cookies.remove("fe-token");
    setAuth({ isAuthenticated: false, user: null });
  };

  const onGetLatestOrderSuccess = (payload) => {
    setLatestOrder(payload);
  };

  const onGetLatestOrderError = () => {
    setLatestOrder(null);
  };

  const { isLoading: isCurrentUserLoading } = useCurrentUser(
    onGetCurrentUserSuccess,
    onError
  );

  const { isLoading: isGetLatestOrderLoading } = useGetLatestOrder(
    onGetLatestOrderSuccess,
    onGetLatestOrderError
  );

  if (isCurrentUserLoading || isGetLatestOrderLoading) return <>LOADING...</>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <OrderContext.Provider value={{ latestOrder, setLatestOrder }}>
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
              path="/orders"
              element={
                <SecurityGuard unloggedRedirectionPath="/">
                  <OrderListPage />
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
              path="/delivery-dashboard"
              element={
                <SecurityGuard deliveryRedirectionPath="/">
                  <DeliveryPage />
                </SecurityGuard>
              }
            />
            <Route
              exact
              path="/delivery-dashboard/orders"
              element={
                <SecurityGuard deliveryRedirectionPath="/">
                  <DeliveryOrdersPage />
                </SecurityGuard>
              }
            />
            <Route exact path="/current-order" element={<CurrentCommand />} />
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
              exact
              path="/payment"
              element={
                <SecurityGuard unloggedRedirectionPath="/">
                  <CheckoutPage />
                </SecurityGuard>
              }
            />
            <Route
              exact
              path="/dashboard/products"
              element={
                <SecurityGuard adminRedirectionPath="/">
                  <ProductListPage />
                </SecurityGuard>
              }
            />
            <Route
              exact
              path="/dashboard/users"
              element={
                <SecurityGuard adminRedirectionPath="/">
                  <UsersListPage />
                </SecurityGuard>
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <SecurityGuard adminRedirectionPath="/">
                  <OrderListAdmin />
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
