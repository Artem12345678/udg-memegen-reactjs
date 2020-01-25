import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";
import MemeGen from "../components/MemeGen/MemeGen";

describe("Home.jsx", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders <MemeGen/> component", () => {
    expect(wrapper.find(MemeGen).exists()).toBe(true);
  });
});
