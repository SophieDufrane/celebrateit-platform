import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar className={styles.Navbar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          CelebrateIt{" "}
          {currentUser && `| ${currentUser.first_name || currentUser.username}`}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link as={NavLink} exact to="/">
              Home
            </Nav.Link>

            {currentUser ? (
              <>
                <NavLink to="/posts/create" className="nav-link">
                  Recognize
                </NavLink>
                <NavLink to="/nominations/create" className="nav-link">
                  Nominate
                </NavLink>
                <NavLink
                  to={`/profiles/${currentUser?.profile_id}`}
                  className="nav-link"
                >
                  Profile
                </NavLink>
                <Nav.Link as={NavLink} to="/" onClick={handleSignOut}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
