import React from "react";
import { shallow } from "enzyme";

import AppFooter from "./AppFooter";
import SocialList from "../SocialList/SocialList";

describe("AppFooter.jsx", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppFooter />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders <SocialList/> component", () => {
    expect(wrapper.find(SocialList).exists()).toBe(true);
  });
});
