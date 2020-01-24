import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import SocialList from "../SocialList/SocialList";

import "./AppFooter.scss";

const AppFooter = () => {
  return (
    <footer className="footer bg-secondary">
      <div className="container">
        <div className="footer__nav">
          <Nav>
            <Nav.Link as={Link} to="/" className="nav-link--footer">
              Home
            </Nav.Link>
          </Nav>

          <div className="footer__social">
            <SocialList />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
