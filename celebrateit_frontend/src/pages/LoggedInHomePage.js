import React, { useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import styles from "../styles/LoggedInHomePage.module.css";

const LoggedInHomePage = () => {
  useEffect(() => {
    axiosReq
      .get("/posts/")
      .then((response) => {
        console.log("API fetch success:", response.data);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
      });
  }, []);
  return (
    <Container>
      <Row>
        {/* Left Column - Feed */}
        <Col md={8}>
          {/* Feed Toggle Buttons */}
          <div className={styles.FeedToggleButtons}>
            <Button className={`${styles.FeedButton} ${styles.YellowButton}`}>
              Recognition Stories
            </Button>
            <Button className={`${styles.FeedButton} ${styles.BlueButton}`}>
              Nominations
            </Button>
          </div>

          {/* One Fake Card */}
          <Card className={styles.PostCard}>
            <Card.Body>
              {/* Top Section: Icon + Name + Date */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                {/* Avatar */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                  }}
                ></div>

                {/* Author Name */}
                <strong className="ml-2 flex-grow-1">John Doe</strong>

                {/* Date */}
                <small className="text-muted">April 25, 2025</small>
              </div>
              <Card.Title>Thank you for your amazing work!</Card.Title>
              <Card.Text>
                Your dedication and attention to detail made a huge difference
                on the project. We truly appreciate everything you've done to
                make it a success!
              </Card.Text>

              {/* Like and Comment Icons */}
              <div className="d-flex justify-content-around mt-4">
                <div className="text-center">
                  <i className="far fa-heart fa-lg"></i>
                  <div>
                    <small>12</small>
                  </div>
                  {/* Fake like count */}
                </div>

                <div className="text-center">
                  <i className="far fa-comment fa-lg"></i>
                  <div>
                    <small>3</small>
                  </div>
                  {/* Fake comment count */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Sidebar */}
        <Col md={4} className={styles.PeopleSidebar}>
          {/* Search field placeholder */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search people..."
            disabled
          />

          {/* People list placeholder */}
          <ListGroup>
            <ListGroup.Item className={styles.PersonItem}>
              Person 1
            </ListGroup.Item>
            <ListGroup.Item className={styles.PersonItem}>
              Person 2
            </ListGroup.Item>
            <ListGroup.Item className={styles.PersonItem}>
              Person 3
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedInHomePage;
