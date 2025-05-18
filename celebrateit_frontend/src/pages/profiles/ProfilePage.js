import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Container>
      <Row>
        {/* Left Column - User Profile Info */}
        <Col md={8}>
          <h2>User Info</h2>
          {/* Placeholder for avatar, name, etc. */}
        </Col>

        {/* Right Column - User Posts & Nominations */}
        <Col md={4}>
          <h2>Recognitions & Nominations</h2>
          {/* Placeholder for feed */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
