import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container, Alert } from "react-bootstrap";
import PostLayoutShell from "../../components/PostLayoutShell";
import MoreDropdown from "../../components/MoreDropdown";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import CommentForm from "../../components/CommentForm";
import styles from "../../styles/PostCard.module.css";

function PostDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();

  const [post, setPost] = useState(null);

  const isNomination = !!post?.nominee;

  let dropdownMenu = null;

  const currentUser = useCurrentUser();

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        post: post.id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes_count: prevPost.likes_count + 1,
        like_id: data.id,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${post.like_id}/`);
      setPost((prevPost) => ({
        ...prevPost,
        likes_count: prevPost.likes_count - 1,
        like_id: null,
      }));
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${post.id}/`);
      history.push("/?deleted=true");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowConfirm(false);
    }
  };

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

  useEffect(() => {
    axios
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

  dropdownMenu = post.is_user ? (
    <MoreDropdown
      handleEdit={() => history.push(`/posts/${post.id}/edit`)}
      handleDelete={handleDelete}
    />
  ) : null;

  const postActions = !isNomination ? (
    <div className={styles.PostFooter}>
      <div className={styles.ActionItem}>
        {post.is_user ? (
          <i className="far fa-thumbs-up" title="Can't like your own post!" />
        ) : post.like_id ? (
          <span onClick={handleUnlike} style={{ cursor: "pointer" }}>
            <i className={`fas fa-thumbs-up ${styles.Heart}`} />
          </span>
        ) : currentUser ? (
          <span onClick={handleLike} style={{ cursor: "pointer" }}>
            <i className={`far fa-thumbs-up ${styles.HeartOutline}`} />
          </span>
        ) : (
          <i className="far fa-thumbs-up" title="Log in to like posts!" />
        )}
        <span>{post.likes_count}</span>
      </div>
      <div className={styles.ActionItem}>
        <i className="far fa-comment"></i>
        <span>{post.comments_count}</span>
      </div>
    </div>
  ) : null;

  return (
    <Container>
      {showSuccess && (
        <Alert variant="success" dismissible>
          {successMessage}
        </Alert>
      )}

      <PostLayoutShell
        title={post.title}
        content={post.content}
        image={post.image}
        display_name={post.display_name}
        created_at={post.created_at}
        likes_count={post.likes_count}
        comments_count={post.comments_count}
        renderDropdown={dropdownMenu}
        postActions={postActions}
      />
      <CommentForm postId={post.id} disabled={!currentUser} />

      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default PostDetailPage;
