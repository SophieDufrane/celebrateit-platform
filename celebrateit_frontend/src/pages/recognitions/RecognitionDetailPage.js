import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import PostLayoutShell from "../../components/PostLayoutShell";
import MoreDropdown from "../../components/MoreDropdown";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";
import CommentEditForm from "../comment/CommentEditForm";
import styles from "../../styles/PostCard.module.css";
import commentStyles from "../../styles/Comment.module.css";

function RecognitionDetailPage() {
  // Routing & context
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const currentUser = useCurrentUser();

  // State
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCommentSuccess, setShowCommentSuccess] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Derived/computed values
  const isNomination = !!post?.nominee;

  // Temporary values
  let dropdownMenu = null;

  // Handlers - Like / Unlike
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

  // Handlers - Delete Posts
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

  // Handlers - Delete comment
  const confirmDeleteComment = async () => {
    try {
      await axiosReq.delete(`/comments/${showDeleteModal}/`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== showDeleteModal)
      );
      setPost((prevPost) => ({
        ...prevPost,
        comments_count: prevPost.comments_count - 1,
      }));
    } catch (err) {
      console.error("Error deleting comment:", err);
    } finally {
      setShowDeleteModal(null);
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

  // Effects
  // Effect: auto-hide success alert and clean up URL
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        const cleanUrl = location.pathname;
        history.replace(cleanUrl);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, history, location.pathname]);

  // Effect: auto-hide comment success alert
  useEffect(() => {
    if (showCommentSuccess) {
      const timer = setTimeout(() => setShowCommentSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCommentSuccess]);

  // Effect: fetch post details
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

  // Fetch comments
  useEffect(() => {
    if (!currentUser) return;
    axios
      .get(`/comments/?post=${id}`)
      .then((response) => {
        setComments(response.data.results || response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id, currentUser]);

  // Early return: loading state
  if (!post) {
    return <Container>Loading...</Container>;
  }

  // Render helpers
  // Temporary values
  dropdownMenu = post.is_user ? (
    <MoreDropdown
      handleEdit={() => history.push(`/recognitions/${post.id}/edit`)}
      handleDelete={handleDelete}
    />
  ) : null;

  const postActions = !isNomination ? (
    <div className={styles.PostFooter}>
      <div className={styles.ActionItem}>
        {post.is_user ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-self-like`}>
                Can't like your own post!
              </Tooltip>
            }
          >
            <span style={{ cursor: "not-allowed" }}>
              <i className="far fa-thumbs-up" />
            </span>
          </OverlayTrigger>
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

      {showCommentSuccess && (
        <Alert variant="success" dismissible>
          Comment posted successfully!
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
      >
        <>
          {post.image && (
            <div className={styles.ImageWrapper}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.PostImage}
              />
            </div>
          )}
          <CommentForm
            postId={post.id}
            disabled={!currentUser}
            onCommentSubmit={(newComment) => {
              setComments((prevComments) => [newComment, ...prevComments]);
              setPost((prevPost) => ({
                ...prevPost,
                comments_count: prevPost.comments_count + 1,
              }));
              setShowCommentSuccess(true);
            }}
          />

          <div className={commentStyles.CommentSection} />

          {comments.length ? (
            comments.map((comment) => {
              return editingComment?.id === comment.id ? (
                <div key={comment.id} className={styles.CommentBlock}>
                  <CommentEditForm
                    comment={comment}
                    postId={post.id}
                    setComments={setComments}
                    setEditingComment={setEditingComment}
                  />
                </div>
              ) : (
                <Comment
                  key={comment.id}
                  comment={comment}
                  setEditingComment={setEditingComment}
                  setShowDeleteModal={setShowDeleteModal}
                />
              );
            })
          ) : (
            <p className="text-muted px-3">No comments yet.</p>
          )}
        </>
      </PostLayoutShell>

      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
      <ConfirmDeleteModal
        show={!!showDeleteModal}
        onHide={() => setShowDeleteModal(null)}
        onConfirm={confirmDeleteComment}
      />
    </Container>
  );
}

export default RecognitionDetailPage;
