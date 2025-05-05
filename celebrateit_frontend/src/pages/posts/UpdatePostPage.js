import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function UpdatePostPage() {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [removeImage, setRemoveImage] = useState(false);

  const { title, content, image } = postData;

  useEffect(() => {
    axiosReq
      .get(`/posts/${id}/`)
      .then((response) => {
        const { title, content, image } = response.data;
        setPostData({ title, content, image });
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        history.push("/");
      });
  }, [id, history]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setPostData({
        ...postData,
        image: files[0],
      });
    } else {
      setPostData({
        ...postData,
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
      formData.append("image", ""); // sends an empty value to clear it
    } else if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      await axiosReq.patch(`/posts/${id}/`, formData);
      history.push(`/posts/${id}?updated=true`);
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
        onCancel={() => history.push(`/posts/${id}`)}
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
            <Form.Control type="file" name="image" onChange={handleChange} />
          </OverlayTrigger>
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default UpdatePostPage;
