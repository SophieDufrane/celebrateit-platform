import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Container, Button, Alert } from "react-bootstrap";
import Post from "../../components/Post";

function PostDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [post, setPost] = useState(null);

  // Check URL for post or update to show success message
  const searchParams = new URLSearchParams(location.search);
  const isCreated = searchParams.get("created") === "true";
  const isUpdated = searchParams.get("updated") === "true";

  const showSuccess = isCreated || isUpdated;
  const successMessage = isCreated
    ? "Your recognition has been published!"
    : isUpdated
    ? "Your recognition has been updated!"
    : "";

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        // remove the param from the URL after alert disappears
        const cleanUrl = location.pathname;
        history.replace(cleanUrl); // clean up ?updated=true or ?created=true
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, history, location.pathname]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${post.id}/`);
      history.push("/?deleted=true");
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
      {showSuccess && (
        <Alert variant="success" dismissible>
          {successMessage}
        </Alert>
      )}

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
          <div className="d-flex gap-2 mt-3">
            <Button
              variant="secondary"
              onClick={() => history.push(`/posts/${post.id}/edit`)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </Post>
    </Container>
  );
}

export default PostDetailPage;
