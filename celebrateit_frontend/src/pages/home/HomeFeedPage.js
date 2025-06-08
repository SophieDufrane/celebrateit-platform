import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import Avatar from "../../components/Avatar";
import LoadingIndicator from "../../components/LoadingIndicator";
import PeopleSearchBar from "../../components/PeopleSearchBar";
import feedStyles from "../../styles/HomeFeedPage.module.css";

function HomeFeedPage() {
  // Routing and Location
  const location = useLocation();
  const history = useHistory();

  // PATCH 8: Consume auth context to trigger re-render after refresh
  const { currentUser, currentUserLoaded } = useCurrentUser();
  // PATCH 8: Optional console for debugging
  useEffect(() => {
    console.log("HomeFeedPage re-evaluated currentUser:", currentUser);
  }, [currentUser]);

  // UI State
  const [showDeleted, setShowDeleted] = useState(false);
  const [showNominations, setShowNominations] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
    axiosReq
      .get("/posts/")
      .then((res) => setRecognitions(res.data.results))
      .catch((err) => {
        // console.log(err);
        // TODO: add user feedback on error
      })
      .finally(() => setHasLoaded(true));
  }, []);

  // Fetch Nomiations data
  useEffect(() => {
    axiosReq
      .get("/nominations/")
      .then((res) => setNominations(res.data.results))
      .catch((err) => {
        // console.log('Error fetching nominations:', err);
        // TODO: add user feedback on error
      });
  }, []);

  // Fetch People/Profiles
  useEffect(() => {
    axiosReq
      .get("/user-profiles/")
      .then((res) => setPeople(res.data.results || res.data))
      .catch((err) => {
        // console.log('Error fetching people:', err);
        // TODO: add user feedback on error
      });
  }, []);

  // PATCH 8: Prevent premature rendering
  if (!currentUserLoaded) return <LoadingIndicator message="Loading..." />;

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
                        user={post.user}
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
                      nominator={nom.nominator}
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
              <LoadingIndicator message="Loading feed..." />
            )}
          </div>
        </Col>

        {/* Right Column - Sidebar */}
        <Col md={4} className={feedStyles.SidebarWrapper}>
          <div className={feedStyles.SearchFilterBlock}>
            {/* Search field placeholder */}
            <PeopleSearchBar
              className={feedStyles.MobileOnly}
              onUserSelect={(user) => {
                history.push(`/profiles/${user.id}`);
              }}
            />
            <input
              type="text"
              className={`${feedStyles.FilterInput} ${feedStyles.DesktopOnly}`}
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Department filter */}
            <select
              className={`${feedStyles.FilterSelect} ${feedStyles.DesktopOnly}`}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {[
                ...new Set(people.map((p) => p.department).filter(Boolean)),
              ].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* People list placeholder */}
          <div className={feedStyles.PeopleList}>
            {people
              .filter((person) => {
                const nameOrUsername = `${person.first_name || ""} ${
                  person.last_name || ""
                } ${person.user || ""}`.toLowerCase();
                const matchesName = nameOrUsername.includes(
                  searchTerm.toLowerCase()
                );
                const matchesDepartment =
                  !selectedDepartment ||
                  person.department === selectedDepartment;
                return matchesName && matchesDepartment;
              })
              .map((person) => {
                return (
                  <ListGroup.Item
                    key={person.id}
                    className={feedStyles.PersonItem}
                    onClick={() => history.push(`/profiles/${person.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={feedStyles.PersonContent}>
                      <Avatar
                        src={person.profile_image}
                        first_name={person.first_name}
                        last_name={person.last_name}
                        username={person.user}
                        size="sm"
                      />
                      <span>
                        {person.first_name || person.last_name
                          ? `${person.first_name || ""} ${
                              person.last_name || ""
                            }`.trim()
                          : person.user}
                      </span>
                    </div>
                  </ListGroup.Item>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeFeedPage;
