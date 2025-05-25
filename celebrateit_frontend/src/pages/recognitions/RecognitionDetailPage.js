import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
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
  const { currentUser } = useCurrentUser();

  // State
  const [recognition, setRecognition] = useState(null);
  const [comments, setComments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCommentSuccess, setShowCommentSuccess] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Derived/computed values
  const isNomination = !!recognition?.nominee;

  // Temporary values
  let dropdownMenu = null;

  // Handlers - Like / Unlike
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        post: recognition.id,
      });
      setRecognition((prev) => ({
        ...prev,
        likes_count: prev.likes_count + 1,
        like_id: data.id,
      }));
    } catch (err) {
      // console.log('Error liking recognition:', err);
      // TODO: add user feedback on error
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${recognition.like_id}/`);
      setRecognition((prev) => ({
        ...prev,
        likes_count: prev.likes_count - 1,
        like_id: null,
      }));
    } catch (err) {
      // console.log('Error unliking recognition:', err);
      // TODO: add user feedback on error
    }
  };

  // Handlers - Delete Posts
  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${recognition.id}/`);
      history.push("/?deleted=true");
    } catch (err) {
      // console.error('Error deleting recognition:', err);
      // TODO: add user feedback on error
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
      setRecognition((prev) => ({
        ...prev,
        comments_count: prev.comments_count - 1,
      }));
    } catch (err) {
      // console.log('Error deleting comment:', err);
      // TODO: add user feedback on error
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
        setRecognition(response.data);
      })
      .catch((error) => {
        // console.log('Error fetching recognitions details:', error);
        // TODO: add user feedback on error
      });
  }, [id]);

  // Fetch comments
  useEffect(() => {
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
  if (!recognition) {
    return <Container>Loading...</Container>;
  }

  // Render helpers
  // Temporary values
  dropdownMenu = recognition.is_user ? (
    <MoreDropdown
      handleEdit={() => history.push(`/recognitions/${recognition.id}/edit`)}
      handleDelete={handleDelete}
    />
  ) : null;

  const postActions = !isNomination ? (
    <div className={styles.PostFooter}>
      <div className={styles.ActionItem}>
        {recognition.is_user ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-self-like">
                Can't like your own recognition!
              </Tooltip>
            }
          >
            <span style={{ cursor: "not-allowed" }}>
              <i className="far fa-thumbs-up" />
            </span>
          </OverlayTrigger>
        ) : recognition.like_id ? (
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
        <span>{recognition.likes_count}</span>
      </div>
      <div className={styles.ActionItem}>
        <i className="far fa-comment" />
        <span>{recognition.comments_count}</span>
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
        title={recognition.title}
        content={recognition.content}
        image={recognition.image}
        display_name={recognition.display_name}
        profile_image={recognition.profile_image}
        created_at={recognition.created_at}
        likes_count={recognition.likes_count}
        comments_count={recognition.comments_count}
        renderDropdown={dropdownMenu}
        postActions={postActions}
      >
        <>
          {recognition.image && (
            <div className={styles.ImageWrapper}>
              <img
                src={recognition.image}
                alt={recognition.title}
                className={styles.PostImage}
              />
            </div>
          )}
          {currentUser ? (
            <CommentForm
              postId={recognition.id}
              onCommentSubmit={(newComment) => {
                setComments((prevComments) => [newComment, ...prevComments]);
                setRecognition((prev) => ({
                  ...prev,
                  comments_count: prev.comments_count + 1,
                }));
                setShowCommentSuccess(true);
              }}
            />
          ) : (
            <p className={styles.LoginToComment}>
              <i className="far fa-comment" /> Log in to leave a comment.
            </p>
          )}

          <div className={commentStyles.CommentSection} />

          {comments.length ? (
            comments.map((comment) =>
              editingComment?.id === comment.id ? (
                <div key={comment.id} className={styles.CommentBlock}>
                  <CommentEditForm
                    comment={comment}
                    postId={recognition.id}
                    setComments={setComments}
                    setEditingComment={setEditingComment}
                    onCancel={() => setEditingComment(null)}
                  />
                </div>
              ) : (
                <Comment
                  key={comment.id}
                  comment={comment}
                  setEditingComment={setEditingComment}
                  setShowDeleteModal={setShowDeleteModal}
                />
              )
            )
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
