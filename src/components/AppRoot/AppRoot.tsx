import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import RatingPage from "../RatingPage/RatingPage";

const AppRoot: React.FC<RouteComponentProps> = props => {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/rating`} component={RatingPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default AppRoot;
