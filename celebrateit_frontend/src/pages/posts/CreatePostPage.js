import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";

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
      // optional: setErrors(err.response?.data);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <Container>
      <h1>Create a Recognition Story</h1>
      <PostForm
        title={title}
        content={content}
        image={image}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <div className="d-flex gap-2 mt-3">
          <Button type="submit" variant="primary">
            Create
          </Button>
          <Button variant="outline-secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </PostForm>
    </Container>
  );
}

export default CreatePostPage;
