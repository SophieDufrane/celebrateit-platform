import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

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
    <Row className="my-4">
      <Col className="p-4">
        <Container>
          <h1>Please sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">Sign In</Button>
          </Form>
        </Container>

        <Container>
          <Link to="/register">
            Don't have an account? <span>Register now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
