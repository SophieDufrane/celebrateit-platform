import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Container } from "react-bootstrap";

const PostDetailPage = ({ match }) => {
  const { id } = match.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    axiosReq
      .get(`/posts/${id}/`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [id]);

  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </Container>
  );
};

export default PostDetailPage;
