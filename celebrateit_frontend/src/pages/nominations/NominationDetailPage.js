import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import PostLayoutShell from "../../components/PostLayoutShell";
import MoreDropdown from "../../components/MoreDropdown";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import styles from "../../styles/PostCard.module.css";
import LoadingIndicator from "../../components/LoadingIndicator";

function NominationDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();

  const [nomination, setNomination] = useState(null);

  let dropdownMenu = null;

  // Check URL for post or update to show success message
  const searchParams = new URLSearchParams(location.search);
  const isCreated = searchParams.get("created") === "true";
  const isUpdated = searchParams.get("updated") === "true";

  const showSuccess = isCreated || isUpdated;
  const successMessage = isCreated
    ? "Your nomination has been published!"
    : isUpdated
    ? "Your nomination has been updated!"
    : "";

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(`/nominations/${nomination.id}/`);
      history.push("/?deleted=true");
    } catch (err) {
      // console.error('Error deleting nomination:', err);
      // TODO: add user feedback on error
    } finally {
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        const cleanUrl = location.pathname;
        history.replace(cleanUrl);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, history, location.pathname]);

  useEffect(() => {
    axiosReq
      .get(`/nominations/${id}/`)
      .then((response) => {
        setNomination(response.data);
        console.log("Nomination object:", response.data); // DEBUG
      })
      .catch((error) => {
        // console.error("Error fetching nomination details:", error);
        // TODO: add user feedback on error
      });
  }, [id]);

  // Early return: loading state
  if (!nomination) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <LoadingIndicator message="Loading nomination..." />
      </Container>
    );
  }

  dropdownMenu = nomination.is_user ? (
    <MoreDropdown
      handleEdit={() => history.push(`/nominations/${nomination.id}/edit`)}
      handleDelete={handleDelete}
    />
  ) : null;

  return (
    <Container>
      {showSuccess && (
        <Alert variant="success" dismissible>
          {successMessage}
        </Alert>
      )}

      <PostLayoutShell
        title={nomination.title}
        content={nomination.content}
        user={nomination.user}
        username={nomination.username}
        first_name={nomination.first_name}
        last_name={nomination.last_name}
        display_name={nomination.display_name}
        profile_image={nomination.profile_image}
        created_at={nomination.created_at}
        renderDropdown={dropdownMenu}
        metaTop={
          nomination.nominee_display_name &&
          nomination.tag && (
            <p className={styles.NominationMeta}>
              <strong>{nomination.nominee_display_name}</strong> was nominated
              by <strong>{nomination.display_name}</strong> for{" "}
              <span
                style={{
                  backgroundColor: nomination.tag_color,
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                }}
              >
                {nomination.tag}
              </span>
            </p>
          )
        }
      />
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default NominationDetailPage;
