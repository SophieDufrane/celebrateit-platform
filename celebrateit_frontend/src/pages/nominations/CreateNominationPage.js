import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function CreateNominationPage() {
  const [nominationData, setNominationData] = useState({
    title: "",
    content: "",
    nominee: "",
    tag: "",
  });
  const [tags, setTags] = useState([]);
  const { title, content, nominee, tag } = nominationData;

  const history = useHistory();

  const [nomineeResults, setNomineeResults] = useState([]);
  const [selectedNomineeName, setSelectedNomineeName] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axiosReq.get("/tags/");
        console.log("Fetched tags:", data);
        setTags(data.results);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (nominee) {
      axiosReq
        .get(`/users/?search=${nominee}`)
        .then((res) => {
          setNomineeResults(res.data.results);
          console.log("Nominee results:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching nominees:", err);
        });
    } else {
      setNomineeResults([]);
    }
  }, [nominee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNominationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleNomineeSelect = (user) => {
    setNominationData((prevData) => ({
      ...prevData,
      nominee: user.id,
    }));
    setSelectedNomineeName(`${user.first_name} ${user.last_name}`);
    setNomineeResults([]);
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
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>Search for a teammate by first or last name</Tooltip>
            }
          >
            <Form.Control
              type="text"
              name="nominee"
              placeholder="Start typing a name..."
              value={selectedNomineeName}
              onChange={handleChange}
            />
          </OverlayTrigger>
          {nomineeResults.length > 0 && (
            <div className={formStyles.SuggestionBox}>
              {nomineeResults.map((user) => (
                <div
                  key={user.id}
                  className={formStyles.SuggestionItem}
                  onClick={() => handleNomineeSelect(user)}
                >
                  {user.first_name} {user.last_name}
                </div>
              ))}
            </div>
          )}
          <Form.Control
            as="select"
            name="tag"
            value={tag}
            onChange={handleChange}
          >
            <option value="">Select a tag</option>
            {tags.map((tagObj) => (
              <option key={tagObj.id} value={tagObj.id}>
                {tagObj.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default CreateNominationPage;
