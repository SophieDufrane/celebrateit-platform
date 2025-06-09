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

// HomeFeedPage: Displays recognition stories and nominations feed with filters and people list sidebar
function HomeFeedPage() {
  // Routing and Location
  const location = useLocation();
  const history = useHistory();

  // PATCH 8: Auth context for re-render and data access
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

  // Show deletion alert based on URL query param
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

  // Fetch Posts (recognitions) data
  useEffect(() => {
    axiosReq
      .get("/posts/")
      .then((res) => setRecognitions(res.data.results))
      .catch((err) => {
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
        // TODO: add user feedback on error
      });
  }, []);

  // Fetch People/Profiles
  useEffect(() => {
    axiosReq
      .get("/user-profiles/")
      .then((res) => setPeople(res.data.results || res.data))
      .catch((err) => {
        // TODO: add user feedback on error
      });
  }, []);

  // PATCH 8: Prevent rendering before currentUser is loaded
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
        {/* Left Column - Feed and toggle buttons */}
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

            {/* Feed content */}
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

        {/* Right Column - Search/filter sidebar */}
        <Col md={4} className={feedStyles.SidebarWrapper}>
          <div className={feedStyles.SearchFilterBlock}>
            {/* Mobile-only PeopleSearchBar */}
            <PeopleSearchBar
              className={feedStyles.MobileOnly}
              onUserSelect={(user) => {
                history.push(`/profiles/${user.id}`);
              }}
            />

            {/* Desktop search input */}
            <input
              type="text"
              className={`${feedStyles.FilterInput} ${feedStyles.DesktopOnly}`}
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Department filter dropdown */}
            <select
              className={`${feedStyles.FilterSelect} ${feedStyles.DesktopOnly}`}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              aria-label="Filter by department"
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

          {/* People list */}
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
