import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

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
      history.push(`/posts/${data.id}?created=true`);
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
          <Form.Label>Image (optional)</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} />
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default CreatePostPage;
