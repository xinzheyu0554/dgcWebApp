// src/components/NavBar.js
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);
  async function signOut() {
    try { await logout(); navigate("/login"); }
    catch (error) { console.error("Sign out failed:", error); }
  }
  return (
    <Navbar className="dgc-navbar" expand="lg" sticky="top" expanded={expanded} onToggle={setExpanded}>
      <Container className="dgc-navbar__inner">
        <LinkContainer to="/">
          <Navbar.Brand className="dgc-navbar__brand">
            <img
              src="/image/web_icon.png"
              alt="Doncaster Garden Club"
              className="dgc-navbar__logo"
            />
            <span className="dgc-navbar__brandText">Doncaster Garden Club</span>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" className="dgc-navbar__toggle" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto dgc-navbar__links"
              onClick={(event) => {
                if (event.target.closest("a[href]")) {
                  setExpanded(false);
                }
              }}>
            <LinkContainer to="/about">
              <Nav.Link className="dgc-navbar__link">About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/calendar">
              <Nav.Link className="dgc-navbar__link">Calendar</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/becomeamember">
              <Nav.Link className="dgc-navbar__link">Membership</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/newsletters">
              <Nav.Link className="dgc-navbar__link">Newsletters</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/speakers">
              <Nav.Link className="dgc-navbar__link">Speakers presentation</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacts">
              <Nav.Link className="dgc-navbar__link">Contacts</Nav.Link>
            </LinkContainer>

            <Dropdown align="end">
              <Dropdown.Toggle as="button" className="dgc-navbar__dropdownToggle">
                Gallery
              </Dropdown.Toggle>

              <Dropdown.Menu className="dgc-navbar__dropdownMenu">
                <LinkContainer to="/gallery">
                  <Dropdown.Item className="dgc-navbar__dropdownItem">
                    Plants
                  </Dropdown.Item>
                </LinkContainer>
                <LinkContainer to="/eventgallery">
                  <Dropdown.Item className="dgc-navbar__dropdownItem">
                    Events
                  </Dropdown.Item>
                </LinkContainer>
              </Dropdown.Menu>
            </Dropdown>

            {user ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link className="dgc-navbar__link">Dashboard</Nav.Link>
                </LinkContainer>
                <Nav.Link className="dgc-navbar__link" onClick={signOut}>Sign out</Nav.Link>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="dgc-navbar__link">Login</Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer to="/PrivacyPolicy">
              <Nav.Link className="dgc-navbar__link">Privacy</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;