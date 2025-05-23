import React, { useEffect, useState } from "react";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import FormFooter from "../../components/FormFooter";
import formStyles from "../../styles/PostForm.module.css";

const EditProfileForm = () => {
  // Routing
  const { id } = useParams();
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("presentation", presentation);

    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    // Submit to API
    try {
      const { data } = await axiosReq.patch(
        `/user-profiles/${profile.id}/`,
        formData
      );
      setProfile(data);
      setCurrentUser(
        await axiosRes.get("/dj-rest-auth/user/").then((res) => res.data)
      );
      history.goBack();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
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
              overlay={
                <Tooltip>
                  To update your first name, please contact your HR
                  representative
                </Tooltip>
              }
            >
              <Form.Control
                type="text"
                value={firstName}
                readOnly
                placeholder="First Name"
              />
            </OverlayTrigger>
          </Form.Group>
          <Form.Group
            controlId="lastName"
            className={formStyles.FormGroupSpacing}
          >
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  To update your last name, please contact your HR
                  representative
                </Tooltip>
              }
            >
              <Form.Control
                type="text"
                value={lastName}
                readOnly
                placeholder="Last Name"
              />
            </OverlayTrigger>
          </Form.Group>

          <Form.Group
            controlId="presentation"
            className={formStyles.FormGroupSpacing}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Write a short bio about yourself</Tooltip>}
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
