import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";
import LoadingIndicator from "../../components/LoadingIndicator";

function UpdateRecognitionPage() {
  // Routing & Navigation
  const { id } = useParams();
  const history = useHistory();

  // Data State
  const [recognitionData, setRecognitionData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [removeImage, setRemoveImage] = useState(false);

  const { title, content, image } = recognitionData;

  // UI State
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosReq
      .get(`/posts/${id}/`)
      .then((response) => {
        const { title, content, image } = response.data;
        setRecognitionData({ title, content, image });
        setHasLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching recognition:", err);
        history.push("/");
      });
  }, [id, history]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name) {
      // Clear error only if the field has a name
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    if (name === "image") {
      setRecognitionData({
        ...recognitionData,
        image: files[0],
      });
    } else {
      setRecognitionData({
        ...recognitionData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (removeImage) {
      formData.append("image", "");
    } else if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      // PATCH 9: Add Authorization header to avoid stale token issues
      await axiosReq.patch(`/posts/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/recognitions/${id}?updated=true`);
    } catch (err) {
      console.error("Submission error:", err.response?.data);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data || {});
      }
    }
  };

  if (!hasLoaded) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <LoadingIndicator message="Loading recognition..." />
      </Container>
    );
  }

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        image={image}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Update"
        onCancel={() => history.push(`/recognitions/${id}`)}
        errors={errors}
      >
        <Form.Group className={formStyles.FormMediaWrapper}>
          {typeof image === "string" && (
            <>
              <img
                src={image}
                alt="Current"
                className={formStyles.FormImagePreview}
              />
              <div className="d-flex align-items-center gap-2 mt-2 mb-3">
                <Form.Check
                  type="checkbox"
                  id="remove-image"
                  label=""
                  aria-label="Remove image"
                  checked={removeImage}
                  onChange={(e) => setRemoveImage(e.target.checked)}
                />
                <Form.Label htmlFor="remove-image" className="mb-0">
                  Remove image
                </Form.Label>
              </div>
            </>
          )}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Upload an image (optional)</Tooltip>}
          >
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              aria-label="Upload an image (optional)"
            />
          </OverlayTrigger>
          <div className={formStyles.AllowedFormats}>
            Allowed formats: jpg, jpeg, png
          </div>
          {Array.isArray(errors?.image) &&
            errors.image.map((message, idx) => (
              <div key={idx} className="text-danger mt-1">
                {message}
              </div>
            ))}
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default UpdateRecognitionPage;
