import React from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import profileStyles from "../../styles/Profile.module.css";
import styles from "../../App.module.css";

const ProfilePage = () => {
  // Routing and Params
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [showUpdated, setShowUpdated] = useState(
    new URLSearchParams(location.search).get("updated")
  );

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
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
        setHasLoadedProfile(true);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  // Fetch recognitions by user
  useEffect(() => {
    if (!id) return;
    axiosReq
      .get(`/posts/?user__profile=${id}`)
      .then((res) => setRecognitions(res.data.results))
      .catch((err) => console.error("Error fetching recognitions:", err))
      .finally(() => setHasLoadedRecognitions(true));
  }, [id]);

  // Fetch nominations by user
  useEffect(() => {
    if (!id) return;
    axiosReq
      .get(`/nominations/?nominator__profile=${id}`)
      .then((res) => setNominations(res.data.results))
      .catch((err) => console.error("Error fetching nominations:", err))
      .finally(() => setHasLoadedNominations(true));
  }, [id]);

  return hasLoadedProfile && hasLoadedRecognitions && hasLoadedNominations ? (
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
              <img
                src={profile.profile_image}
                alt={`${profile.first_name} ${profile.last_name}`}
                className={profileStyles.ProfileAvatar}
              />
            </div>

            {/* Profile info + edit icon */}
            <div className={profileStyles.ProfileDetails}>
              <div className={profileStyles.NameRow}>
                <div className={profileStyles.NameRow}>
                  <h3>
                    {profile.first_name} {profile.last_name}
                  </h3>

                  {profile.is_user_profile ? (
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
                  )}
                </div>
              </div>
              <p className={profileStyles.Department}>{profile.department}</p>
              <p className={profileStyles.Bio}>
                {profile.presentation || "No bio yet."}
              </p>
            </div>
          </div>
        )}
        <div className={profileStyles.TwoColumnFeed}>
          <div className={profileStyles.FeedColumn}>
            <h4>Your Recognitions</h4>
            {recognitions
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
              ))}
          </div>
          <div className={profileStyles.FeedColumn}>
            <h4>Your Nominations</h4>
            {nominations
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
              ))}
          </div>
        </div>
      </Container>
    </>
  ) : (
    <LoadingIndicator message="Loading profile..." />
  );
};

export default ProfilePage;
