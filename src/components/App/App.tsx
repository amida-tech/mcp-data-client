import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../services/ApolloClient";
import AppRoot from "../AppRoot/AppRoot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/app" component={AppRoot} />
      <Redirect to="/app" />
    </Switch>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ToastContainer progressClassName="toastify__progress" />
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;
