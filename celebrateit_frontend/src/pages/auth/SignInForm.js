import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import authStyles from "../../styles/AuthForm.module.css";
import sharedStyles from "../../App.module.css";
import authPic from "../../assets/auth_pic.jpeg";

// SignInForm: Login form with alert support for logout/registration status
function SignInForm() {
  // Location-based alerts
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(
    new URLSearchParams(location.search).get("registered")
  );

  const [showLogout, setShowLogout] = useState(
    new URLSearchParams(location.search).get("loggedOut")
  );

  // Auto-hide alerts after 4 seconds
  useEffect(() => {
    if (showSuccess || showLogout) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowLogout(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, showLogout]);

  // State & Context
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const { username, password } = signInData;
  const history = useHistory();

  // Handlers
  function handleChange(event) {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);

      // Store the tokens in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      setTokenTimestamp(data);

      // Refetch user using token
      const { data: userData } = await axiosReq.get("/dj-rest-auth/user/");
      setCurrentUser(userData);

      // Redirect to homepage
      history.push("/");
    } catch (err) {
      setLoginErrors(err.response?.data || {});
    }
  }

  return (
    <>
      {showSuccess && (
        <Alert variant="success" className="mt-3 text-center">
          Registration successful! Please log in.
        </Alert>
      )}
      {showLogout && (
        <Alert variant="info" className="mt-3 text-center">
          You have been logged out.
        </Alert>
      )}
      <Container className="d-flex justify-content-center">
        <div className={authStyles.gradient}>
          <div className={authStyles.gradientOverlay}>
            <div className={authStyles.splitBox}>
              <div className={authStyles.formBox}>
                <h2 className={authStyles.AuthTitle}>LOGIN</h2>
                {Object.keys(loginErrors).length > 0 && (
                  <div className={authStyles.ErrorBox}>
                    <ul className="mb-0 ps-3">
                      {Object.values(loginErrors)
                        .flat()
                        .map((message, index) => (
                          <li key={index}>{message}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {/* Login form */}
                <Form
                  onSubmit={handleSubmit}
                  className={authStyles.FormWrapper}
                >
                  <Form.Group
                    controlId="username"
                    className={authStyles.FormGroupSpacing}
                  >
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      aria-label="Username"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="password"
                    className={authStyles.FormGroupSpacing}
                  >
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      aria-label="Password"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className={`${sharedStyles.YellowButton} ${authStyles.CenteredButton}`}
                  >
                    Submit
                  </Button>
                </Form>

                {/* Register link */}
                <div className={authStyles.AuthLink}>
                  OR
                  <Link to="/register" className={authStyles.AuthLinkHighlight}>
                    Sign up!
                  </Link>
                </div>
              </div>

              {/* Side image */}
              <div className={authStyles.imageBox}>
                <img
                  src={authPic}
                  alt="Sign in illustration"
                  className={authStyles.AuthImage}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignInForm;
