/** @author Prit Thakkar (B00890731)*/
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

import "./navbar.css";

/**
 *
 * @returns the Navbar component - used in the admin panel
 */
function NavbarComponent() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container className="nav-cont">
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            navigate("/");
          }}
        >
          Book-a-holic Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={(e) => {
                navigate("/books");
              }}
            >
              Books
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                navigate("/users");
              }}
            >
              Users
            </Nav.Link>
          </Nav>
          {/* <FontAwesomeIcon
            icon={faUser}
            color="#FFF"
            className="profile-icon"
          /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
