import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import App from "../App/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const homePage = () => {
    return (
      <App>
        <HomePage />
      </App>
    );
  };
  ReactDOM.render(homePage(), div);
  ReactDOM.unmountComponentAtNode(div);
});
