import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import AppFooter from "../AppFooter/AppFooter";
import Router from "../../router";

import "./App.scss";

const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <AppHeader />

        <main className="container">
          <Router />
        </main>

        <AppFooter />
      </BrowserRouter>
    </div>
  );
};

export default App;
