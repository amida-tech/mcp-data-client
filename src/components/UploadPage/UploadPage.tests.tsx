import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../services/ApolloClient";
import UploadPage from "./UploadPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const uploadPage = () => {
    return (
      <ApolloProvider client={client}>
        <UploadPage />
      </ApolloProvider>
    );
  };
  ReactDOM.render(uploadPage(), div);
  ReactDOM.unmountComponentAtNode(div);
});
