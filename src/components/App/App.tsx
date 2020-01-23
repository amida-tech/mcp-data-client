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
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;
