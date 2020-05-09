import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import custAuth from "../hoc/c_auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import ChatPage from "./views/ChatPage/ChatPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/HistoryPage/HistoryPage";
import UserProvider from "../context/UserProvider";
import Profile from "./views/Profile/Profile";
import history from "./History";
import CustomerLoginPage from "./views/CustomerLoginPage/CustomerLoginPage";
import customerDashboard from "./views/customerDashboard/customerDashboard";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch history={history}>
          <UserProvider>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route path="/vendor/login" component={Auth(LoginPage, false)} />
            <Route
              path="/vendor/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              path="/product/upload"
              component={Auth(UploadProductPage, true)}
            />
            <Route
              path="/product/:productId"
              component={Auth(DetailProductPage, null)}
            />
            <Route path="/chat" component={Auth(ChatPage, true)} />
            <Route path="/history" component={Auth(HistoryPage, true)} />
            <Route path="/profile" component={Auth(Profile, true)} />

            <Route
              path="/customer/login"
              component={custAuth(CustomerLoginPage, false)}
            />

            <Route
              path="/customer/dashoard"
              component={custAuth(customerDashboard, true)}
            />

            <Route path="/user/cart" component={Auth(CartPage, true)} />
          </UserProvider>
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
