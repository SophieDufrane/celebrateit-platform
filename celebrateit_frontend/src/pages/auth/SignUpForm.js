import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import authStyles from "../../styles/AuthForm.module.css";
import sharedStyles from "../../App.module.css";
import registerPic from "../../assets/register_pic.jpg";

// SignUpForm: Form for user registration
function SignUpForm() {
  // State
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password1, password2 } = signUpData;
  const history = useHistory();

  // Handlers
  function handleChange(event) {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axiosReq.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login?registered=true");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className={authStyles.gradient}>
        <div className={authStyles.gradientOverlay}>
          <div className={authStyles.splitBox}>
            {/* Form section */}
            <div className={authStyles.formBox}>
              <h2 className={authStyles.AuthTitle}>Register</h2>
              <Form onSubmit={handleSubmit} className={authStyles.FormWrapper}>
                {/* Error list */}
                {Object.keys(errors).length > 0 && (
                  <div className={authStyles.ErrorBox}>
                    <ul className="mb-0 ps-3">
                      {Object.values(errors)
                        .flat()
                        .map((message, index) => (
                          <li key={index}>{message}</li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Username field */}
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

                {/* Password field */}
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
                    aria-label="Password"
                  />
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
                    aria-label="Confirm Password"
                  />
                </Form.Group>

                {/* Submit button */}
                <Button
                  type="submit"
                  className={`${sharedStyles.YellowButton} ${authStyles.CenteredButton}`}
                >
                  Submit
                </Button>
              </Form>

              {/* Login redirect link */}
              <div className={authStyles.AuthLink}>
                OR
                <Link to="/login" className={authStyles.AuthLinkHighlight}>
                  Log In!
                </Link>
              </div>
            </div>

            {/* Image section */}
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
