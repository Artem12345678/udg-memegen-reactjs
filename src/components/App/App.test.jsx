import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import AppHeader from "../AppHeader/AppHeader";
import AppFooter from "../AppFooter/AppFooter";
import Home from "../../views/Home";

describe("App.jsx", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders <AppHeader/> component", () => {
    expect(wrapper.find(AppHeader).exists()).toBe(true);
  });

  it("renders <AppFooter/> component", () => {
    expect(wrapper.find(AppFooter).exists()).toBe(true);
  });

  describe("with router", () => {
    it("renders <Home/> component by default", () => {
      wrapper = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
    });

    it('renders <Home/> component for "/" route path', () => {
      wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
    });
  });
});
