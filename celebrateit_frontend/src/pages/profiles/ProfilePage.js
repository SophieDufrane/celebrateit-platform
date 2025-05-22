import React from "react";
import { Container } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import styles from "../../styles/Profile.module.css";

const ProfilePage = () => {
  // Routing and Params
  const { id } = useParams();
  const history = useHistory();

  // Profile info
  const [profile, setProfile] = useState(null);

  // User-related posts
  const [recognitions, setRecognitions] = useState([]);
  const [nominations, setNominations] = useState([]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  // Fetch recognitions and nominations by user
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [recRes, nomRes] = await Promise.all([
          axiosReq.get(`/posts/?user__profile=${id}`),
          axiosReq.get(`/nominations/?nominator__profile=${id}`),
        ]);
        setRecognitions(recRes.data.results);
        setNominations(nomRes.data.results);
      } catch (err) {
        console.error("Error fetching posts or nominations:", err);
      }
    };

    fetchData();
  }, [id]);

  console.log("is_user_profile:", profile?.is_user_profile); // DEBUG: check is_user

  return (
    <Container>
      {/* User Profile Info */}
      {profile && (
        <div className={styles.ProfileWrapper}>
          <div className={styles.Banner} />

          {/* Avatar overlaps banner */}
          <div className={styles.AvatarWrapper}>
            <img
              src={profile.profile_image}
              alt={`${profile.first_name} ${profile.last_name}`}
              className={styles.ProfileAvatar}
            />
          </div>

          {/* Profile info + edit icon */}
          <div className={styles.ProfileDetails}>
            <div className={styles.NameRow}>
              <h3>
                {profile.first_name} {profile.last_name}
              </h3>
              {profile.is_user_profile && (
                <span
                  className={styles.EditIcon}
                  onClick={() => history.push(`/profiles/${profile.id}/edit`)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-pen" />
                </span>
              )}
            </div>
            <p className={styles.Department}>{profile.department}</p>
            <p className={styles.Bio}>
              {profile.presentation || "No bio yet."}
            </p>
          </div>
        </div>
      )}
      <div className={styles.TwoColumnFeed}>
        <div className={styles.FeedColumn}>
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
        <div className={styles.FeedColumn}>
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
  );
};

export default ProfilePage;
