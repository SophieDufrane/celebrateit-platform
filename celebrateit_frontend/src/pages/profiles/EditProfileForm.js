import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import FormFooter from "../../components/FormFooter";
import formStyles from "../../styles/PostForm.module.css";

const EditProfileForm = () => {
  // Routing
  const { id } = useParams();
  const history = useHistory();

  // Profile State - basic fields
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [presentation, setPresentation] = useState("");

  // Profile State - image handling
  const [imageFile, setImageFile] = useState(null);

  // Fetch Profile on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPresentation(data.presentation || "");
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
          <Form.Group
            controlId="firstName"
            className={formStyles.FormGroupSpacing}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Update your first name</Tooltip>}
            >
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </OverlayTrigger>
          </Form.Group>
          <Form.Group
            controlId="lastName"
            className={formStyles.FormGroupSpacing}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Update your last name</Tooltip>}
            >
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </OverlayTrigger>
          </Form.Group>

          <Form.Group
            controlId="presentation"
            className={formStyles.FormGroupSpacing}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Write something about yourself</Tooltip>}
            >
              <Form.Control
                as="textarea"
                rows={3}
                value={presentation}
                onChange={(e) => setPresentation(e.target.value)}
                placeholder="Write something about yourself"
              />
            </OverlayTrigger>
          </Form.Group>
          <Form.Group className={formStyles.FormGroupSpacing}>
            {/* Preview current image if exists and not marked for removal */}
            {profile.profile_image && (
              <img
                src={profile.profile_image}
                alt="Current profile"
                className={formStyles.FormImagePreview}
              />
            )}
            <Form.Control
              type="file"
              name="profile_image"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>

          <FormFooter submitText="Update" onCancel={() => history.goBack()} />
        </Form>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default EditProfileForm;
