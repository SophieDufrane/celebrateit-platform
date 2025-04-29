import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function CreatePostPage() {
  return (
    <Container>
      <h1>Create a Recognition Story</h1>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" name="title" />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write your story..."
            name="content"
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image (optional)</Form.Label>
          <Form.File name="image" />
        </Form.Group>

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}

export default CreatePostPage;
