import React from "react";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const LoggedInHomePage = () => {
  return (
    <Container>
      <Row>
        {/* Left Column - Feed */}
        <Col md={8}>
          {/* Feed Toggle Buttons */}
          <div className="d-flex justify-content-center mb-3">
            <Button variant="outline-secondary" className="mr-2">
              Recognition Stories
            </Button>
            <Button variant="outline-info">Nominations</Button>
          </div>

          {/* One Empty Card */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Sidebar */}
        <Col md={4}>
          {/* Search field placeholder */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search people..."
            disabled
          />

          {/* People list placeholder */}
          <ListGroup>
            <ListGroup.Item>Person 1</ListGroup.Item>
            <ListGroup.Item>Person 2</ListGroup.Item>
            <ListGroup.Item>Person 3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedInHomePage;
