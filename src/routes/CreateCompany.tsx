import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../store';
import { thunkPostApplication } from '../store/applications/thunks';
import RequestStatus from '../store/RequestStatus';

interface EmployeeFieldState {
  name: string;
  age: string | number;
}

export const apiKey = localStorage.getItem('apiKey');

const CreateCompany: React.FunctionComponent = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    url: '',
    postcode: '',
  });
  const [employeeFields, setEmployeeFields] = useState<EmployeeFieldState[] | []>([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { addApplicationState } = useSelector((state: RootState) => state.applications);

  //limiting total employees to add in one req
  const employeeLimit = 10;

  ///handle employee input field changes here
  const handleInputChange = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...employeeFields];
    const {
      target: { name, value },
    } = event;

    if (name === 'employeeName') {
      values[idx].name = value;
    } else {
      values[idx].age = parseInt(value);
    }
    setEmployeeFields(values);
  };

  ///add employee input fields here
  const handleAddInputFields = () => {
    if (employeeFields.length === employeeLimit) {
      return null;
    }
    const values = [...employeeFields];
    values.push({ name: '', age: '' });
    setEmployeeFields(values);
  };

  //setting state using input field names
  const handleCompanyData = (inputName: string, value: string | number) => {
    setCompanyData((state) => ({ ...state, [inputName]: value }));
  };

  const renderEmployeeInputs = (inputs: EmployeeFieldState[]) => {
    return inputs.map((value, idx) => (
      <Fragment key={idx}>
        <Form.Group controlId={`formEmplyeeName${idx}`} className='mt-2'>
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type='text'
            name='employeeName'
            placeholder='Name'
            value={value.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(idx, e)}
          />
        </Form.Group>
        <Form.Group controlId={`formEmplyeeNAge${idx}`}>
          <Form.Label>Employee Age</Form.Label>
          <Form.Control
            type='number'
            name='employeeAge'
            placeholder='Age'
            value={value.age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(idx, e)}
          />
        </Form.Group>

        <hr style={{ width: '100%', borderTopWidth: '1px', margin: 0, borderColor: 'black' }} />
      </Fragment>
    ));
  };

  ///merge company and employee data for api req
  const postData = { ...companyData, employees: employeeFields };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>, postData: any, apiKey: string) => {
    e.preventDefault();
    dispatch(thunkPostApplication(postData, apiKey as string));
  };

  ///redirect to companies page on successful req
  useEffect(() => {
    if (addApplicationState === RequestStatus.Success) {
      history.push('/companies');
    }
  }, [addApplicationState, history]);

  ///on api req failing clear input fields
  useEffect(() => {
    addApplicationState === 3 &&
      setCompanyData({
        address: '',
        url: '',
        name: '',
        postcode: '',
      });
    addApplicationState === 3 && setEmployeeFields([]);
  }, [addApplicationState]);

  return (
    <Container>
      {addApplicationState === 3 ? <Alert variant='danger'>Oops! Something went wrong please try again!</Alert> : null}
      <Row className='justify-content-center mt-2'>
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleOnSubmit(e, postData, apiKey as string)}>
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter Name'
              value={companyData.name}
              onChange={(e) => handleCompanyData(e.target.name, e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formAddress'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={companyData.address}
              placeholder='Address'
              onChange={(e) => handleCompanyData(e.target.name, e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formPostcode'>
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type='text'
              name='postcode'
              placeholder='Postcode'
              value={companyData.postcode}
              onChange={(e) => handleCompanyData(e.target.name, e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formLink'>
            <Form.Label>Link to Website</Form.Label>
            <Form.Control
              type='text'
              name='url'
              placeholder='Link to Website'
              value={companyData.url}
              onChange={(e) => handleCompanyData(e.target.name, e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type='button'
            variant='secondary'
            onClick={handleAddInputFields}
            disabled={employeeFields.length === employeeLimit}
          >
            Add employee
          </Button>
          {renderEmployeeInputs(employeeFields)}
          <Button type='submit' variant='primary' style={{ display: 'block', marginTop: '10px' }}>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CreateCompany;
