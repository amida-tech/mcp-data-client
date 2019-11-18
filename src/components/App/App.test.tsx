import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route } from "react-router-dom";
import Enzyme, { mount } from "enzyme";
import App, { Routes } from "./App";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("redirects /unknown-route to /app", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[`/unknown-route`]}>
      <Route component={Routes} />
    </MemoryRouter>
  );
  expect(wrapper.find(Routes).props().location.pathname).toBe("/app");
});
