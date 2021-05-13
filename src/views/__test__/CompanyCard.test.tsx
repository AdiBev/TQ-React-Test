import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CompanyCard from '../CompanyCard';
import { Company } from '../../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props: Company = {
  name: 'Test',
  url: 'http://google.com',
  address: '123 test',
  employees: [{ age: 22, name: 'test employee' }],
};

const Container = () => (
  <ReduxProvider store={mockStore()}>
    <BrowserRouter>
      <CompanyCard company={props} />
    </BrowserRouter>
  </ReduxProvider>
);

describe('<CompanyCard />', () => {
  test('Renders  <CompanyCard />', () => {
    render(<Container />);
  });

  test('Renders props', () => {
    render(<Container />);
    expect(screen.getByText(props.name as string)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', props.url as string);
    expect(screen.getByText(props.address as string)).toBeInTheDocument();
  });

  test('Modal shows children and close button', () => {
    render(<Container />);
    fireEvent.click(screen.getByText('View Employees'));
    expect(screen.getByText(`Name: ${props.employees[0]?.name as string}`)).toBeInTheDocument();
    expect(screen.getByText(`Age: ${props.employees[0].age}`)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
