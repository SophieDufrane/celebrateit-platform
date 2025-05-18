import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        console.log("Fetched profile:", data);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <Container>
      <Row>
        {/* Left Column - User Profile Info */}
        <Col md={8}>
          <h2>
            {profile.first_name} {profile.last_name}
          </h2>
          <p>{profile.presentation || "No bio yet."}</p>
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
