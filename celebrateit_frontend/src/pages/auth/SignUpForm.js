import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import authStyles from "../../styles/AuthForm.module.css";
import sharedStyles from "../../App.module.css";
import registerPic from "../../assets/register_pic.jpg";

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password1, password2 } = signUpData;
  const history = useHistory();

  function handleChange(event) {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className={authStyles.gradient}>
        <div className={authStyles.gradientOverlay}>
          <div className={authStyles.splitBox}>
            <div className={authStyles.formBox}>
              <h2 className={authStyles.AuthTitle}>Register</h2>
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
                  {errors.username && (
                    <Form.Text className="text-danger">
                      {errors.username}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  controlId="password1"
                  className={authStyles.FormGroupSpacing}
                >
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                  {errors.password1 && (
                    <Form.Text className="text-danger">
                      {errors.password1}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  controlId="password2"
                  className={authStyles.FormGroupSpacing}
                >
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                  {errors.password2 && (
                    <Form.Text className="text-danger">
                      {errors.password2}
                    </Form.Text>
                  )}
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
                <Link to="/login" className={authStyles.AuthLinkHighlight}>
                  Log In!
                </Link>
              </div>
            </div>
            <div className={authStyles.imageBox}>
              <img
                src={registerPic}
                alt="Register illustration"
                className={authStyles.AuthImage}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUpForm;
