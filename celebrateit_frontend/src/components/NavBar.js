import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const { currentUser, currentUserLoaded } = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/login?loggedOut=true");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Navbar className={styles.Navbar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          CelebrateIt{" "}
          {currentUser?.first_name || currentUser?.username
            ? `| ${currentUser.first_name || currentUser.username}`
            : ""}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link as={NavLink} exact to="/">
              Home
            </Nav.Link>

            {currentUser && currentUser ? (
              <>
                <NavLink to="/recognitions/create" className="nav-link">
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
            ) : currentUserLoaded ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
