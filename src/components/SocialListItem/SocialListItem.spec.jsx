import React from "react";
import { shallow } from "enzyme";

import SocialListItem from "./SocialListItem";

import instagram from "../../assets/instagram.svg";
import github from "../../assets/github.svg";

describe("SocialListItem.jsx", () => {
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

  it("matches snapshot", () => {
    wrapper = shallow(
      <SocialListItem url={links[0].url} icon={links[0].icon} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders Github icon", () => {
    wrapper = shallow(
      <SocialListItem url={links[0].url} icon={links[0].icon} />
    );

    expect(wrapper.find(".social__link").exists()).toBe(true);
    expect(
      wrapper
        .find(".social__link")
        .at(0)
        .props().href
    ).toBe(links[0].url);
    expect(
      wrapper
        .find(".social__link img")
        .at(0)
        .props().src
    ).toBe(github);
  });

  it("renders Instagram icon", () => {
    wrapper = shallow(
      <SocialListItem url={links[1].url} icon={links[1].icon} />
    );

    expect(wrapper.find(".social__link").exists()).toBe(true);
    expect(
      wrapper
        .find(".social__link")
        .at(0)
        .props().href
    ).toBe(links[1].url);
    expect(
      wrapper
        .find(".social__link img")
        .at(0)
        .props().src
    ).toBe(instagram);
  });
});
