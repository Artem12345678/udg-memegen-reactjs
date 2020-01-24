import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <header className="header bg-primary">
      <div className="container">
        <Navbar variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/" className="brand">
            MemeGen
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="nav-collapse" />

          <Navbar.Collapse id="nav-collapse">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default AppHeader;
