import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import App from "../App/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const nav = () => {
    return (
      <App>
        <Nav />
      </App>
    );
  };
  ReactDOM.render(nav(), div);
  ReactDOM.unmountComponentAtNode(div);
});
