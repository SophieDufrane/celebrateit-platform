import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import feedStyles from "../../styles/HomeFeedPage.module.css";

const HomeFeedPage = () => {
  const location = useLocation();
  const isDeleted =
    new URLSearchParams(location.search).get("deleted") === "true";
  const [showDeleted, setShowDeleted] = useState(isDeleted);

  const [recognitions, setRecognitions] = useState([]);
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
    axios
      .get("/posts/")
      .then((res) => setRecognitions(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setHasLoaded(true));
  }, []);

  // Fetch Nomiations data
  useEffect(() => {
    axios
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
                variant="none"
                className={`${feedStyles.FeedButton} ${
                  !showNominations
                    ? feedStyles.FeedToggleActive
                    : feedStyles.FeedToggleInactive
                }`}
                onClick={() => setShowNominations(false)}
              >
                Recognition Stories
              </Button>
              <Button
                variant="none"
                className={`${feedStyles.FeedButton} ${
                  showNominations
                    ? feedStyles.FeedToggleActive
                    : feedStyles.FeedToggleInactive
                }`}
                onClick={() => setShowNominations(true)}
              >
                Nominations
              </Button>
            </div>

            {hasLoaded ? (
              <>
                {!showNominations ? (
                  recognitions.length ? (
                    recognitions.map((post) => (
                      <RecognitionCard
                        key={`post-${post.id}`}
                        {...post}
                        setRecognitions={setRecognitions}
                        onPostDelete={(deletedId) =>
                          setRecognitions((prev) =>
                            prev.filter((r) => r.id !== deletedId)
                          )
                        }
                      />
                    ))
                  ) : (
                    <div>No recognitions yet</div>
                  )
                ) : nominations.length ? (
                  nominations.map((nom) => (
                    <NominationCard
                      key={`nom-${nom.id}`}
                      {...nom}
                      setPosts={setNominations}
                      onPostDelete={(deletedId) =>
                        setNominations((prevNoms) =>
                          prevNoms.filter((n) => n.id !== deletedId)
                        )
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

export default HomeFeedPage;
