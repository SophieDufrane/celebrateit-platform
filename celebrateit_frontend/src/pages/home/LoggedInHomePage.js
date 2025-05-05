import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import PostCard from "../../components/PostCard";
import feedStyles from "../../styles/LoggedInHomePage.module.css";
import sharedStyles from "../../App.module.css";

const LoggedInHomePage = () => {
  const location = useLocation();
  const isDeleted =
    new URLSearchParams(location.search).get("deleted") === "true";
  const [showDeleted, setShowDeleted] = useState(isDeleted);

  const [posts, setPosts] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [showNominations, setShowNominations] = useState(false);

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

  // Fetch Posts data
  useEffect(() => {
    axiosReq
      .get("/posts/")
      .then((res) => setPosts(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setHasLoaded(true));
  }, []);

  // Fetch Nomiations data
  useEffect(() => {
    axiosReq
      .get("/nominations/")
      .then((res) => setNominations(res.data.results))
      .catch((err) => console.error("Error fetching nominations:", err));
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
          <div className={feedStyles.FeedContent}>
            {/* Feed Toggle Buttons */}
            <div className={feedStyles.FeedToggleButtons}>
              <Button
                className={`${feedStyles.FeedButton} ${
                  sharedStyles.YellowButton
                } ${!showNominations ? feedStyles.Active : ""}`}
                onClick={() => setShowNominations(false)}
              >
                Recognition Stories
              </Button>
              <Button
                className={`${feedStyles.FeedButton} ${
                  sharedStyles.BlueButton
                } ${showNominations ? feedStyles.Active : ""}`}
                onClick={() => setShowNominations(true)}
              >
                Nominationss
              </Button>
            </div>

            {hasLoaded ? (
              <>
                {/* Posts */}
                {posts.length ? (
                  posts.map((post) => (
                    <PostCard
                      key={`post-${post.id}`}
                      {...post}
                      onPostDelete={(deletedId) =>
                        setPosts((prevPosts) =>
                          prevPosts.filter((p) => p.id !== deletedId)
                        )
                      }
                    />
                  ))
                ) : (
                  <div>No posts yet</div>
                )}

                {/* Nominations */}
                {nominations.length ? (
                  nominations.map((nom) => (
                    <PostCard
                      key={`nom-${nom.id}`}
                      {...nom}
                      detailUrl={`/nominations/${nom.id}`}
                      extraContent={
                        <p>
                          {nom.display_name} was nominated for {nom.tag}
                        </p>
                      }
                    />
                  ))
                ) : (
                  <div>No nominations yet</div>
                )}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Col>

        {/* Right Column - Sidebar */}
        <Col md={4} className={feedStyles.PeopleSidebar}>
          {/* Search field placeholder */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search people..."
            disabled
          />

          {/* People list placeholder */}
          <ListGroup>
            <ListGroup.Item className={feedStyles.PersonItem}>
              Person 1
            </ListGroup.Item>
            <ListGroup.Item className={feedStyles.PersonItem}>
              Person 2
            </ListGroup.Item>
            <ListGroup.Item className={feedStyles.PersonItem}>
              Person 3
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedInHomePage;
