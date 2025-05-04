import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function CreateNominationPage() {
  const [nominationData, setNominationData] = useState({
    title: "",
    content: "",
    nominee: "",
    tag: "",
  });
  const { title, content, nominee, tag } = nominationData;
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNominationData({
      ...nominationData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nominee", nominee);
    if (tag) formData.append("tag", tag);

    try {
      const { data } = await axiosReq.post("/nominations/", formData);
      history.push(`/nominations/${data.id}?created=true`);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        nominee={nominee}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Nominate"
        onCancel={handleCancel}
      >
        <Form.Group controlId="nominee" className={formStyles.FormMediaWrapper}>
          {/* Will add Tooltips to the fields*/}
          <Form.Control
            type="text"
            name="nominee"
            placeholder="Enter nominee's username"
            value={nominee}
            onChange={handleChange}
          />
          <Form.Control
            as="select"
            name="tag"
            value={tag}
            onChange={handleChange}
          >
            <option value="">Select a tag</option>
            <option value="1">Teamwork</option>
            <option value="2">Leadership</option>
            <option value="3">Creativity</option>
          </Form.Control>
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default CreateNominationPage;
