import React, { useEffect } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from '../store';
import { thunkGetApplication } from '../store/applications/thunks';
import CompanyCard from '../views/CompanyCard';

export const apiKey = localStorage.getItem('apiKey');

const Companies = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state: RootState) => state.applications);

  useEffect(() => {
    dispatch(thunkGetApplication(apiKey as string));
  }, [dispatch]);

  ///show error message if api req fails
  if (!companies || companies.length === 0) {
    return (
      <Container className='mt-2'>
        <Alert variant={'danger'}>Ooops! Something went wrong please try again!</Alert>
      </Container>
    );
  }

  return (
    <Container className='mt-2 mb-2'>
      <LinkContainer to='/create' className='mt-2 mb-2'>
        <Button>Create company</Button>
      </LinkContainer>
      <Row lg={3} xs={1} sm={2}>
        {companies?.length > 0 &&
          companies.map((company, idx) => (
            <Col key={idx} className='mt-2'>
              <CompanyCard company={company} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Companies;
