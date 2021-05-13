import React, { Fragment, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Company, Employee } from '../types';

interface Props {
  company: Company;
}

const CompanyCard: React.FunctionComponent<Props> = ({ company: { name, url, address, employees } }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleModal = () => {
    setDisplayModal((s) => !s);
  };

  const renderEmployees = (employees: Employee[]) => {
    if (employees.length > 0) {
      return (
        <Modal show={displayModal}>
          {employees.map((employee, idx) => (
            <Fragment key={idx}>
              <Modal.Body>
                <p> Name: {employee.name}</p>
                <p>Age: {employee.age}</p>
              </Modal.Body>
              <hr style={{ width: '100%', borderTopWidth: '2px', margin: 0 }} />
            </Fragment>
          ))}
          <Modal.Footer>
            <Button variant='secondary' onClick={handleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  };

  return (
    <Card>
      <Card.Body>
        {name && <Card.Title>{name}</Card.Title>}
        {address && <Card.Text>{address}</Card.Text>}
        {url && (
          <Card.Link href={url} className='mb-1' style={{ display: 'block' }}>
            Website
          </Card.Link>
        )}
        {employees.length > 0 && (
          <Button variant='primary' onClick={handleModal}>
            View Employees
          </Button>
        )}
      </Card.Body>
      {renderEmployees(employees)}
    </Card>
  );
};

export default CompanyCard;
