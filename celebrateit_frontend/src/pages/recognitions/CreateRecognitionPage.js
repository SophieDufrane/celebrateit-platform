import React, { useState } from "react";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function CreateRecognitionPage() {
  const [recognitionData, setRecognitionData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const { title, content, image } = recognitionData;
  const history = useHistory();

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
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/recognitions/${data.id}?created=true`);
    } catch (err) {
      console.error(err.response?.data);
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
      >
        <Form.Group controlId="image" className={formStyles.FormMediaWrapper}>
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

export default CreateRecognitionPage;
