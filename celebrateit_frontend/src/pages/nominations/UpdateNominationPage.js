import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function UpdateNominationPage() {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    nominee_display_name: "",
    tag: "",
  });
  const { title, content, nominee_display_name, tag } = postData;

  const [tags, setTags] = useState([]);

  useEffect(() => {
    axiosReq
      .get(`/nominations/${id}/`)
      .then((response) => {
        const { title, content, nominee_display_name, tag } = response.data;
        setPostData({ title, content, nominee_display_name, tag });
      })
      .catch((err) => {
        console.error("Error fetching nominations:", err);
        history.push("/");
      });
  }, [id, history]);

  useEffect(() => {
    axiosReq
      .get("/tags/")
      .then((response) => setTags(response.data))
      .catch((err) => {
        console.error("Error fetching tags:", err);
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
      await axiosReq.patch(`/nominations/${id}/`, formData);
      history.push(`/nominations/${id}?updated=true`);
    } catch (err) {
      console.error("Submission error:", err.response?.data);
    }
  };

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
