import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Container } from "react-bootstrap";
import Post from "../components/Post";

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
      <Post
        title={post.title}
        content={post.content}
        image={post.image}
        display_name={post.display_name}
        created_at={post.created_at}
        likes_count={post.likes_count}
        comments_count={post.comments_count}
      />
    </Container>
  );
};

export default PostDetailPage;
