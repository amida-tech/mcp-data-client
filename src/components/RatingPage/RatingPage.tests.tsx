import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../services/ApolloClient";
import RatingPage from "./RatingPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const ratingPage = () => {
    return (
      <ApolloProvider client={client}>
        <RatingPage />
      </ApolloProvider>
    );
  };
  ReactDOM.render(ratingPage(), div);
  ReactDOM.unmountComponentAtNode(div);
});
