import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import RecognitionCard from "../recognitions/RecognitionCard";
import NominationCard from "../nominations/NominationCard";
import styles from "../../styles/Profile.module.css";

const ProfilePage = () => {
  const { id } = useParams();

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
      <Row>
        {/* Left Column - User Profile Info */}
        <Col md={6}>
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
                    <span className={styles.EditIcon}>
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
        </Col>

        {/* Right Column - User Posts & Nominations */}
        <Col md={6}>
          {recognitions.map((post) => (
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

          {nominations.map((nom) => (
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
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
