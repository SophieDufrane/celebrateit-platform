import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function CreatePostPage() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const { title, content, image } = postData;
  const history = useHistory();

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
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.error(err.response?.data);
      // optional: setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <h1>Create a Recognition Story</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write your story..."
            name="content"
            value={content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image (optional)</Form.Label>
          <Form.File
            name="image"
            onChange={handleChange}
            label={image?.name || "Choose an image"}
            custom
          />
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}

export default CreatePostPage;
