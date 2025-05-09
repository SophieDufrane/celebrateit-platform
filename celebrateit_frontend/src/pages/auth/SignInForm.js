import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosRes } from "../../api/axiosDefaults";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import authStyles from "../../styles/AuthForm.module.css";
import sharedStyles from "../../App.module.css";
import authPic from "../../assets/auth_pic.jpeg";

function SignInForm() {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(
    new URLSearchParams(location.search).get("registered")
  );

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const history = useHistory();

  function handleChange(event) {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", signInData);
      const { data: userData } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(userData); // Save real user data to Context
      history.push("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data);
    }
  }

  return (
    <>
      {showSuccess && (
        <Alert variant="success" className="mt-3 text-center">
          Registration successful! Please log in.
        </Alert>
      )}
      <Container className="d-flex justify-content-center">
        <div className={authStyles.gradient}>
          <div className={authStyles.gradientOverlay}>
            <div className={authStyles.splitBox}>
              <div className={authStyles.formBox}>
                <h2 className={authStyles.AuthTitle}>LOGIN</h2>
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
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className={`${sharedStyles.YellowButton} ${authStyles.CenteredButton}`}
                  >
                    Submit
                  </Button>
                </Form>
                <div className={authStyles.AuthLink}>
                  OR
                  <Link to="/register" className={authStyles.AuthLinkHighlight}>
                    Sign up!
                  </Link>
                </div>
              </div>
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
