import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Container, Button } from "react-bootstrap";
import Post from "../../components/Post";

function PostDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${post.id}/`);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

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
        id={post.id}
        title={post.title}
        content={post.content}
        image={post.image}
        display_name={post.display_name}
        created_at={post.created_at}
        likes_count={post.likes_count}
        comments_count={post.comments_count}
      >
        {post.is_user && (
          <div className="mt-3">
            <Button variant="danger" onClick={handleDelete}>
              Delete Post
            </Button>
          </div>
        )}
      </Post>
    </Container>
  );
}

export default PostDetailPage;
