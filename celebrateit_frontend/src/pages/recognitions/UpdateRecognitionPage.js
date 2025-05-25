import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function UpdateRecognitionPage() {
  const { id } = useParams();
  const history = useHistory();
  const [recognitionData, setRecognitionData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [removeImage, setRemoveImage] = useState(false);

  const { title, content, image } = recognitionData;

  useEffect(() => {
    axiosReq
      .get(`/posts/${id}/`)
      .then((response) => {
        const { title, content, image } = response.data;
        setRecognitionData({ title, content, image });
      })
      .catch((err) => {
        console.error("Error fetching recognition:", err);
        history.push("/");
      });
  }, [id, history]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
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
      await axiosReq.patch(`/posts/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/recognitions/${id}?updated=true`);
    } catch (err) {
      console.error("Submission error:", err.response?.data);
    }
  };

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
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default UpdateRecognitionPage;
