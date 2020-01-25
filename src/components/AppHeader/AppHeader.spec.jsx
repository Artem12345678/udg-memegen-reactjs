import React from "react";
import { shallow } from "enzyme";

import AppHeader from "./AppHeader";

describe("AppHeader.jsx", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppHeader />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
