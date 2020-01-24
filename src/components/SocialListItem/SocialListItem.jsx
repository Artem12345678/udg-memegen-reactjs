import React from "react";
import PropTypes from "prop-types";

import instagram from "../../assets/instagram.svg";
import github from "../../assets/github.svg";

import "./SocialListItem.scss";

const SocialListItem = ({ url, icon }) => {
  const image = icon === "instagram" ? instagram : github;

  return (
    <a
      className="social__link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={image} alt="socialIcon" />
    </a>
  );
};

SocialListItem.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SocialListItem;
