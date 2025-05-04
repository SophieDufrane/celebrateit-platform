import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";

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
        tag={tag}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      ></PostForm>
    </Container>
  );
}

export default CreateNominationPage;
