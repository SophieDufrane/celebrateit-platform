import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import PostCard from "../../components/PostCard";
import styles from "../../styles/LoggedInHomePage.module.css";

const LoggedInHomePage = () => {
  const location = useLocation();
  const isDeleted =
    new URLSearchParams(location.search).get("deleted") === "true";
  const [showDeleted, setShowDeleted] = useState(isDeleted);

  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Handle URL query param to trigger alert
  useEffect(() => {
    const isDeletedParam =
      new URLSearchParams(location.search).get("deleted") === "true";
    setShowDeleted(isDeletedParam);
  }, [location.search]);

  // Automatically hide the alert after 4 seconds
  useEffect(() => {
    if (showDeleted) {
      const timer = setTimeout(() => setShowDeleted(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showDeleted]);

  // Fetch data
  useEffect(() => {
    axiosReq
      .get("/posts/")
      .then((res) => setPosts(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setHasLoaded(true));
  }, []);

  return (
    <Container>
      {showDeleted && (
        <Alert
          variant="success"
          onClose={() => setShowDeleted(false)}
          dismissible
        >
          The post has been deleted successfully.
        </Alert>
      )}

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

          {hasLoaded ? (
            posts.length ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  onPostDelete={(deletedId) =>
                    setPosts((prevPosts) =>
                      prevPosts.filter((p) => p.id !== deletedId)
                    )
                  }
                />
              ))
            ) : (
              <div>No posts yet</div> // If loaded but empty
            )
          ) : (
            <div>Loading...</div> // While waiting
          )}
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
