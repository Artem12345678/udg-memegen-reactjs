import React, { Component } from "react";
import SocialListItem from "../SocialListItem/SocialListItem";

import "./SocialList.scss";

class SocialList extends Component {
  state = {
    links: [
      {
        url: "https://www.github.com/Artem12345678",
        icon: "github"
      },
      {
        url: "https://www.instagram.com/ystimenkoartem",
        icon: "instagram"
      }
    ]
  };

  render() {
    const { links } = this.state;

    return (
      <ul className="social">
        {links.map(item => (
          <li key={item.icon} className="social__item">
            <SocialListItem url={item.url} icon={item.icon} />
          </li>
        ))}
      </ul>
    );
  }
}

export default SocialList;
