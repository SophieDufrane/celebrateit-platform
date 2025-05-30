import React, { useState } from "react";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function CreateRecognitionPage() {
  // Form fields
  const [recognitionData, setRecognitionData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const { title, content, image } = recognitionData;

  // Error state
  const [errors, setErrors] = useState({});

  // Navigation
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser(); // Refresh user after creation

  // Handle input changes (text & file upload)
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB.");
        return;
      }
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

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      // PATCH 9: Explicit token for POST request (prevent refresh desync)
      const { data } = await axiosReq.post("/posts/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // PATCH 9: Rehydrate user context after creation
      const currentUserData = await axiosRes
        .get("/dj-rest-auth/user/")
        .then((res) => res.data);
      setCurrentUser(currentUserData);

      history.push(`/recognitions/${data.id}?created=true`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // console.log('Submission error:', err.response?.data);
      }
    }
  };

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Create"
        onCancel={() => history.push("/")}
        errors={errors}
      >
        <Form.Group controlId="image" className={formStyles.FormMediaWrapper}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Upload an image (optional)</Tooltip>}
          >
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              aria-label="Upload an optional image"
            />
          </OverlayTrigger>
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default CreateRecognitionPage;
