import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";
import LoadingIndicator from "../../components/LoadingIndicator";

function UpdateNominationPage() {
  // Routing & Navigation
  const { id } = useParams();
  const history = useHistory();

  // Data State
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    nominee_display_name: "",
    tag: "",
  });
  const { title, content, nominee_display_name, tag } = postData;

  const [tags, setTags] = useState([]);

  // UI State
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    axiosReq
      .get(`/nominations/${id}/`)
      .then((response) => {
        const { title, content, nominee_display_name, tag } = response.data;
        setPostData({
          title,
          content,
          nominee_display_name,
          tag,
        });
        setHasLoaded(true);
      })
      .catch((err) => {
        // console.log('Error fetching nominations:', err);
        // TODO: add user feedback on error
        history.push("/");
      });
  }, [id, history]);

  useEffect(() => {
    axiosReq
      .get("/tags/")
      .then((response) => setTags(response.data.results))
      .catch((err) => {
        // console.error("Error fetching tags:", err);
        // TODO: add user feedback on error
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", tag);

    try {
      // PATCH 9: Explicit token header for nomination updates
      await axiosReq.patch(`/nominations/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/nominations/${id}?updated=true`);
    } catch (err) {
      // console.error("Submission error:", err.response?.data);
      // TODO: add user feedback on error
    }
  };

  if (!hasLoaded) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <LoadingIndicator message="Loading nomination..." />
      </Container>
    );
  }

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Update"
        onCancel={() => history.push(`/nominations/${id}`)}
      >
        <Form.Group className={formStyles.FormMediaWrapper}>
          {/* Read-only nominee display */}
          <Form.Label className="mb-2">
            <strong>Nominee:</strong>
          </Form.Label>
          <div className="mb-3">{nominee_display_name}</div>

          {/* Editable tag dropdown */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Select a new tag if needed</Tooltip>}
          >
            <Form.Control
              as="select"
              name="tag"
              value={tag}
              aria-label="Select a new tag if needed"
              onChange={handleChange}
            >
              <option value="">Select a tag</option>
              {tags.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </Form.Control>
          </OverlayTrigger>
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default UpdateNominationPage;
