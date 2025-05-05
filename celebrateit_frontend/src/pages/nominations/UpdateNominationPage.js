import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import PostForm from "../../components/PostForm";

function UpdateNominationPage() {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const { title, content } = postData;

  useEffect(() => {
    axiosReq
      .get(`/nominations/${id}/`)
      .then((response) => {
        const { title, content } = response.data;
        setPostData({ title, content });
      })
      .catch((err) => {
        console.error("Error fetching nominations:", err);
        history.push("/");
      });
  }, [id, history]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      await axiosReq.patch(`/nominations/${id}/`, formData);
      history.push(`/nominations/${id}?updated=true`);
    } catch (err) {
      console.error("Submission error:", err.response?.data);
    }
  };

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Update"
        onCancel={() => history.push(`/posts/${id}`)}
      ></PostForm>
    </Container>
  );
}

export default UpdateNominationPage;
