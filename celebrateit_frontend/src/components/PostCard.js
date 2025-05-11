import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import MoreDropdown from "./MoreDropdown";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import styles from "../styles/PostCard.module.css";
import PostLayoutShell from "./PostLayoutShell";

const PostCard = (props) => {
  const {
    id,
    title,
    content,
    image,
    display_name,
    created_at,
    likes_count,
    comments_count,
    is_user,
    like_id,
    setPosts,
    onPostDelete,
    detailUrl = `/posts/${id}`,
    editUrl = `/posts/${id}/edit`,
    extraContent = null,
    deleteUrl = `/posts/${id}`,
  } = props;
  // console.log(`Post ${id} - likes: ${likes_count}, like_id: ${like_id}`);

  const currentUser = useCurrentUser();

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        post: id, // temporary, to adjust for nominations after
      });
      console.log("Like API response:", data);

      setPosts((prevPosts) => {
        if (!prevPosts?.results) return prevPosts;
        return {
          ...prevPosts,
          results: prevPosts.results.map((item) =>
            item.id === id
              ? { ...item, likes_count: item.likes_count + 1, like_id: data.id }
              : item
          ),
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => {
        if (!prevPosts?.results) return prevPosts;
        return {
          ...prevPosts,
          results: prevPosts.results.map((item) =>
            item.id === id
              ? { ...item, likes_count: item.likes_count - 1, like_id: null }
              : item
          ),
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const truncatedContent =
    content.length > 150
      ? content.slice(0, content.slice(0, 150).lastIndexOf(" ")) + "..."
      : content;

  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(deleteUrl);
      if (onPostDelete) {
        onPostDelete(id);
      }
      history.push("/?deleted=true");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <PostLayoutShell
        title={title}
        content={truncatedContent}
        image={image}
        display_name={display_name}
        created_at={created_at}
        likes_count={likes_count}
        comments_count={comments_count}
        renderDropdown={
          is_user && (
            <MoreDropdown
              handleEdit={() => history.push(editUrl)}
              handleDelete={handleDelete}
            />
          )
        }
        postActions={
          <div className={styles.PostFooter}>
            <div className={styles.ActionItem}>
              {is_user ? (
                <i
                  className="far fa-thumbs-up"
                  title="Can't like your own post!"
                />
              ) : like_id ? (
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
              <span>{likes_count}</span>
            </div>
            <div className={styles.ActionItem}>
              <i className="far fa-comment"></i>
              <span>{comments_count}</span>
            </div>
          </div>
        }
      >
        <Link
          to={detailUrl}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {extraContent}
          <h5 className={styles.PostTitle}>{title}</h5>
          <p className={styles.PostContent}>{truncatedContent}</p>
          {content.length > 150 && (
            <div className={styles.ReadMore}>Read more…</div>
          )}
          {image && <Card.Img variant="top" src={image} alt={title} />}
        </Link>
      </PostLayoutShell>
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default PostCard;
