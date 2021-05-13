import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>React Interview Project</h1>
          <p>
            Welcome to the TerraQuest React interview project! Please use this project to develop the test requirements
            within.
          </p>

          <hr />

          <LinkContainer to='/companies'>
            <Button>View Companies</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
