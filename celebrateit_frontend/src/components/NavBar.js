import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";

// NavBar: Top navigation bar with auth-aware links
function NavBar() {
  // Auth context
  const { currentUser, currentUserLoaded } = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Navbar Toggle State
  const [expanded, setExpanded] = useState(false);

  // Handlers
  const handleSignOut = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // full reset to avoid ghost state but land on login page
      window.location.assign("/login?loggedOut=true");
    } catch (err) {
      // TODO: add user feedback on error
    }
  };

  return (
    <Navbar
      className={styles.Navbar}
      expand="md"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          CelebrateIt{" "}
          {currentUser?.first_name || currentUser?.username
            ? `| ${currentUser.first_name || currentUser.username}`
            : ""}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link
              as={NavLink}
              exact
              to="/"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>

            {currentUser && currentUser ? (
              <>
                <NavLink
                  to="/recognitions/create"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  Recognize
                </NavLink>
                <NavLink
                  to="/nominations/create"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  Nominate
                </NavLink>
                {currentUser.profile_id && (
                  <NavLink
                    to={`/profiles/${currentUser.profile_id}`}
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                  >
                    Profile
                  </NavLink>
                )}
                <Nav.Link
                  as={NavLink}
                  to="/"
                  onClick={() => {
                    setExpanded(false);
                    handleSignOut();
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : currentUserLoaded ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Log In
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  onClick={() => setExpanded(false)}
                >
                  Register
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
