import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import FormFooter from "../../components/FormFooter";
import formStyles from "../../styles/PostForm.module.css";
import LoadingIndicator from "../../components/LoadingIndicator";

// EditProfileForm: Allows user to edit their profile presentation and image
function EditProfileForm() {
  // Routing & Navigation
  const { id } = useParams();
  const history = useHistory();

  // Context for current user
  const setCurrentUser = useSetCurrentUser();

  // Data State - Profile info
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [presentation, setPresentation] = useState("");

  // Data State - Image
  const [imageFile, setImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  // UI State
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch Profile data on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPresentation(data.presentation || "");
        setHasLoaded(true);
      } catch (err) {
        // TODO: add user feedback on error
      }
    };

    fetchProfile();
  }, [id]);

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("presentation", presentation);

    if (removeImage) {
      formData.append("profile_image", "");
    } else if (imageFile && typeof imageFile !== "string") {
      formData.append("profile_image", imageFile);
    }
    try {
      const { data } = await axiosReq.patch(
        `/user-profiles/${profile.id}/`,
        formData,
        {
          // PATCH 9: Explicit token header for profile update
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(data);

      // Refresh current user context after update
      setCurrentUser(
        await axiosRes.get("/dj-rest-auth/user/").then((res) => res.data)
      );
      history.push(`/profiles/${profile.id}?updated=true`);
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  // Show loading indicator until data is fetched
  if (!hasLoaded) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <LoadingIndicator message="Loading profile..." />
      </Container>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Edit your profile</h2>
      {profile ? (
        <Form onSubmit={handleSubmit}>
          {/* Read-only first name with tooltip */}
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
              <div className={formStyles.ReadOnlyWrapper}>
                <Form.Control
                  className={formStyles.ReadOnlyInput}
                  type="text"
                  value={firstName}
                  readOnly
                  tabIndex={-1}
                  placeholder="First Name"
                  aria-label="First Name (read-only)"
                />
              </div>
            </OverlayTrigger>
          </Form.Group>

          {/* Read-only last name with tooltip */}
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
              <div className={formStyles.ReadOnlyWrapper}>
                <Form.Control
                  className={formStyles.ReadOnlyInput}
                  type="text"
                  value={lastName}
                  readOnly
                  tabIndex={-1}
                  placeholder="Last Name"
                  aria-label="Last Name (read-only)"
                />
              </div>
            </OverlayTrigger>
          </Form.Group>

          {/* Editable presentation/bio field */}
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
                aria-label="Short bio about yourself"
              />
            </OverlayTrigger>
            {Array.isArray(errors?.presentation) &&
              errors.presentation.map((msg, idx) => (
                <div key={idx} className="text-danger mt-1">
                  {msg}
                </div>
              ))}
          </Form.Group>

          {/* Profile image preview, remove checkbox, and upload */}
          <Form.Group className={formStyles.FormGroupSpacing}>
            {profile.profile_image && (
              <>
                <img
                  src={profile.profile_image}
                  alt="Current profile"
                  className={formStyles.FormImagePreview}
                />
                <div className="d-flex align-items-center gap-2 mt-2 mb-3">
                  <Form.Check
                    type="checkbox"
                    id="remove-profile-image"
                    label=""
                    aria-label="Remove profile image"
                    checked={removeImage}
                    onChange={(e) => setRemoveImage(e.target.checked)}
                  />
                  <Form.Label htmlFor="remove-profile-image" className="mb-0">
                    Remove profile image
                  </Form.Label>
                </div>
              </>
            )}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Upload a new profile image (optional)</Tooltip>}
            >
              <Form.Control
                type="file"
                name="profile_image"
                onChange={(e) => setImageFile(e.target.files[0])}
                aria-label="Upload new profile image"
              />
            </OverlayTrigger>
            <div className={formStyles.AllowedFormats}>
              Allowed formats: jpg, jpeg, png
            </div>
            {Array.isArray(errors?.profile_image) &&
              errors.profile_image.map((message, idx) => (
                <div key={idx} className="text-danger mt-1">
                  {message}
                </div>
              ))}
          </Form.Group>

          {/* Submit and cancel buttons */}
          <FormFooter submitText="Update" onCancel={() => history.goBack()} />
        </Form>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default EditProfileForm;
