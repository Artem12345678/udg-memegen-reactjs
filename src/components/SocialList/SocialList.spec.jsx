import React from "react";
import { shallow } from "enzyme";

import SocialList from "./SocialList";
import SocialListItem from "../SocialListItem/SocialListItem";

describe("SocialList.jsx", () => {
  let wrapper;

  const links = [
    {
      url: "https://www.github.com/Artem12345678",
      icon: "github"
    },
    {
      url: "https://www.instagram.com/ystimenkoartem",
      icon: "instagram"
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<SocialList />);
    wrapper.setState({ links });
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders <SocialListItem/> components", () => {
    expect(wrapper.find(SocialListItem).exists()).toBe(true);
  });

  it("renders the right amount of <SocialListItem/> components", () => {
    expect(wrapper.find(SocialListItem).length).toBe(links.length);
  });
});
