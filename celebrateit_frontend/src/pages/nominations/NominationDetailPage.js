import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Container, Alert } from "react-bootstrap";
import PostLayoutShell from "../../components/PostLayoutShell";
import MoreDropdown from "../../components/MoreDropdown";

function NominationDetailPage() {
  const { id } = useParams();
  const history = useHistory();
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

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/nominations/${nomination.id}/`);
      history.push("/?deleted=true");
    } catch (err) {
      console.error("Error deleting nomination:", err);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        const cleanUrl = location.pathname;
        history.replace(cleanUrl); // clean up ?updated=true or ?created=true
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, history, location.pathname]);

  useEffect(() => {
    axiosReq
      .get(`/nominations/${id}/`)
      .then((response) => {
        setNomination(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nomination details:", error);
      });
  }, [id]);

  if (!nomination) {
    return <Container>Loading...</Container>;
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
        display_name={nomination.display_name}
        created_at={nomination.created_at}
        likes_count={nomination.likes_count}
        comments_count={nomination.comments_count}
        renderDropdown={dropdownMenu}
        // pass nominee, tag later
      />
    </Container>
  );
}

export default NominationDetailPage;
