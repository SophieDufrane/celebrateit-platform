import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import Avatar from "../../components/Avatar";
import profileStyles from "../../styles/Profile.module.css";
import styles from "../../App.module.css";

function ProfilePage() {
  // Routing and Params
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [showUpdated, setShowUpdated] = useState(
    new URLSearchParams(location.search).get("updated")
  );

  // Context
  const { currentUser } = useCurrentUser();

  // Profile info
  const [profile, setProfile] = useState(null);

  // User-related posts
  const [recognitions, setRecognitions] = useState([]);
  const [nominations, setNominations] = useState([]);

  // UI State
  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);
  const [hasLoadedRecognitions, setHasLoadedRecognitions] = useState(false);
  const [hasLoadedNominations, setHasLoadedNominations] = useState(false);

  useEffect(() => {
    if (showUpdated) {
      const timer = setTimeout(() => setShowUpdated(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showUpdated]);

  // Fetch user profile
  useEffect(() => {
    if (id === "undefined") return;
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        // console.error("Error fetching profile:", err);
      } finally {
        setHasLoadedProfile(true);
      }
    };

    fetchProfile();
  }, [id]);

  // Fetch recognitions by user
  useEffect(() => {
    if (id === "undefined") return;
    axiosReq
      .get(`/posts/?user__profile=${id}`)
      .then((res) => setRecognitions(res.data.results))
      .catch(() => {})
      .finally(() => setHasLoadedRecognitions(true));
  }, [id]);

  // Fetch nominations by user
  useEffect(() => {
    if (id === "undefined") return;
    axiosReq
      .get(`/nominations/?nominator__profile=${id}`)
      .then((res) => setNominations(res.data.results))
      .catch(() => {})
      .finally(() => setHasLoadedNominations(true));
  }, [id]);

  if (id === "undefined") {
    return <LoadingIndicator message="Preparing your profile..." />;
  }

  if (!hasLoadedProfile || !hasLoadedRecognitions || !hasLoadedNominations) {
    return <LoadingIndicator message="Loading profile..." />;
  }

  // Flags to detect missing core vs optional profile info
  const isCoreInfoMissing =
    !profile.first_name || !profile.last_name || !profile.department;
  const isOptionalInfoMissing = !profile.presentation || !profile.profile_image;

  return (
    <>
      {showUpdated && (
        <div className="alert alert-success text-center mt-3">
          Your profile has been updated!
        </div>
      )}
      <Container>
        {/* User Profile Info */}
        {profile && (
          <div className={profileStyles.ProfileWrapper}>
            <div className={profileStyles.Banner} />

            {/* Avatar overlaps banner */}
            <div className={profileStyles.AvatarWrapper}>
              <Avatar
                src={profile.profile_image}
                first_name={profile.first_name}
                last_name={profile.last_name}
                username={profile.user}
                size="lg"
              />
            </div>

            {/* Profile info + edit icon */}
            <div className={profileStyles.ProfileDetails}>
              <div className={profileStyles.NameRow}>
                <h3>
                  {profile.first_name || profile.last_name
                    ? `${profile.first_name || ""} ${
                        profile.last_name || ""
                      }`.trim()
                    : profile.user}
                </h3>

                {currentUser ? (
                  profile.is_user_profile ? (
                    <span
                      className={profileStyles.EditIcon}
                      onClick={() =>
                        history.push(`/profiles/${profile.id}/edit`)
                      }
                    >
                      <i className="fa-solid fa-pen" />
                    </span>
                  ) : (
                    <Button
                      className={styles.YellowButton}
                      onClick={() =>
                        history.push(
                          `/nominations/create?nominee=${profile.user}` +
                            `&name=${profile.first_name} ${profile.last_name}`
                        )
                      }
                    >
                      Nominate
                    </Button>
                  )
                ) : null}
              </div>
              {isCoreInfoMissing && (
                <p className={profileStyles.IncompleteNote}>
                  {" "}
                  {profile.is_user_profile ? (
                    <>
                      Some profile details are missing. Contact HR to update
                      your name or department.
                    </>
                  ) : (
                    <>
                      This profile is still under review and may be incomplete.
                    </>
                  )}
                </p>
              )}
              {!isCoreInfoMissing &&
                profile.is_user_profile &&
                isOptionalInfoMissing && (
                  <p className={profileStyles.IncompleteNote}>
                    You can complete your profile by adding a picture or writing
                    a short bio using the edit icon.
                  </p>
                )}
              <p className={profileStyles.Department}>{profile.department}</p>
              <p className={profileStyles.Bio}>
                {profile.presentation || "No bio yet."}
              </p>
            </div>
          </div>
        )}
        <div className={profileStyles.TwoColumnFeed}>
          <div className={profileStyles.FeedColumn}>
            <div className={profileStyles.SectionTitlePurple}>Recognitions</div>
            {recognitions.filter((post) => post.user === profile.user).length >
            0 ? (
              recognitions
                .filter((post) => post.user === profile.user)
                .map((post) => (
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
              <p className="text-center text-muted">No recognitions yet.</p>
            )}
          </div>
          <div className={profileStyles.FeedColumn}>
            <div className={profileStyles.SectionTitleYellow}>Nominations</div>
            {nominations.filter(
              (nom) =>
                nom.nominator === profile.user ||
                nom.nominee_username === profile.user
            ).length > 0 ? (
              nominations
                .filter(
                  (nom) =>
                    nom.nominator === profile.user ||
                    nom.nominee_username === profile.user
                )
                .map((nom) => (
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
              <p className="text-center text-muted">No nominations yet.</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProfilePage;
