import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import FormFooter from "../../components/FormFooter";
import { Form } from "react-bootstrap";

const EditProfileForm = () => {
  // Routing
  const { id } = useParams();
  const history = useHistory();

  // Profile State
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");

  // Fetch Profile on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
        setFirstName(data.first_name);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted first name:", firstName);
  };

  return (
    <div className="container mt-4">
      <h2>Edit your profile</h2>
      {profile ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </Form.Group>
          <FormFooter submitText="Save" onCancel={() => history.goBack()} />
        </Form>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default EditProfileForm;
