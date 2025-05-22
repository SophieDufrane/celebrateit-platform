import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import feedStyles from "../../styles/HomeFeedPage.module.css";

const HomeFeedPage = () => {
  // Routing and Location
  const location = useLocation();
  const isDeleted =
    new URLSearchParams(location.search).get("deleted") === "true";

  // UI State
  const [showDeleted, setShowDeleted] = useState(isDeleted);
  const [showNominations, setShowNominations] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Data State
  const [recognitions, setRecognitions] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [people, setPeople] = useState([]);

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

  // Fetch People/Profiles
  useEffect(() => {
    axios
      .get("/user-profiles/")
      .then((res) => setPeople(res.data.results || res.data))
      .catch((err) => console.error("Error fetching people:", err));
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* People list placeholder */}
          {people
            .filter((person) =>
              `${person.first_name} ${person.last_name}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((person) => (
              <ListGroup.Item key={person.id} className={feedStyles.PersonItem}>
                <div className="d-flex align-items-center">
                  <img
                    src={person.profile_image}
                    alt={`${person.first_name}'s avatar`}
                    className="rounded-circle me-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                  />
                  <span>
                    {person.first_name} {person.last_name}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeFeedPage;
