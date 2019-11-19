import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../HomePage/HomePage";
import RatingPage from "../RatingPage/RatingPage";

const AppRoot: React.FC<RouteComponentProps> = props => {
  const { match } = props;

  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/rating`} component={RatingPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Layout>
  );
};

export default AppRoot;
