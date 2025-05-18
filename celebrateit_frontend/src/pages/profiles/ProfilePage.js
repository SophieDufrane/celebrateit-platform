import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Profile.module.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        console.log("Profile image:", data.profile_image);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  console.log("is_user_profile:", profile?.is_user_profile); // DEBUG: check is_user

  return (
    <Container>
      <Row>
        {/* Left Column - User Profile Info */}
        <Col md={8}>
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
        <Col md={4}>
          <h2>Recognitions & Nominations</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
