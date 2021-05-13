import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Companies from '../Companies';
import { execFileSync } from 'child_process';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const companies = [
  {
    name: 'Test',
    url: 'http://google.com',
    address: '123 test',
    employees: [{ age: 22, name: 'test employee' }],
  },
];

const Container = () => (
  <ReduxProvider store={mockStore()}>
    <BrowserRouter>
      <Companies />
    </BrowserRouter>
  </ReduxProvider>
);

describe('<Companies />', () => {
  test('Renders <Companies />', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ companies });
    render(<Container />);
  });

  test('Displays comapnies informations', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ companies });
    render(<Container />);

    companies.map((company) => {
      expect(screen.getByText(company.name)).toBeInTheDocument();
      expect(screen.getByText(company.address)).toBeInTheDocument();
    });
  });

  // test('Shows error message if companies data not present', () => {
  //   const spy = jest.spyOn(redux, 'useSelector');
  //   spy.mockReturnValue({ companies: [] });
  //   render(<Container />);
  //   expect(screen.getByText('Ooops! Something went wrong please try again!')).toBeInTheDocument();
  // });
});
