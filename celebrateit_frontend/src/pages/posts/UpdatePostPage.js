import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function UpdatePostPage() {
  const { id } = useParams();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const { title, content, image } = postData;

  const history = useHistory();

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

  return (
    <Container>
      <h1>Edit Post {id}</h1>
      <Form>
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
            placeholder="Write your updated story..."
            name="content"
            value={content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Change Image (optional)</Form.Label>
          <Form.File
            name="image"
            onChange={handleChange}
            label={
              typeof image === "string"
                ? "Current image will remain"
                : image?.name
            }
            custom
          />
        </Form.Group>

        <Button type="submit" disabled>
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default UpdatePostPage;
