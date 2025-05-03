import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import authStyles from "../../styles/AuthForm.module.css";
import sharedStyles from "../../App.module.css";

function SignInForm() {
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
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user); // Save user to Context
      history.goBack();
    } catch (err) {
      console.error("Login failed:", err.response?.data);
    }
  }

  return (
    <Container>
      <h1 className="text-center">Please sign in</h1>
      <img
        src="/images/signin-illustration.png"
        alt="Sign in illustration"
        className={authStyles.AuthImage}
      />
      <Form onSubmit={handleSubmit} className={authStyles.FormWrapper}>
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
          Sign In
        </Button>
      </Form>

      <div className={authStyles.AuthLink}>
        Don't have an account?
        <Link to="/register" className={authStyles.AuthLinkHighlight}>
          Register now!
        </Link>
      </div>
    </Container>
  );
}

export default SignInForm;
