import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CreateCompany from '../CreateCompany';
import RequestStatus from '../../store/RequestStatus';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const Container = () => (
  <ReduxProvider store={mockStore()}>
    <BrowserRouter>
      <CreateCompany />
    </BrowserRouter>
  </ReduxProvider>
);

describe('<CreateCompany />', () => {
  test('Renders <CreateCompany />', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ addApplicationState: RequestStatus.Success });
    render(<Container />);
  });

  test('Shows error message when post req fails', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ addApplicationState: RequestStatus.Failed });
    render(<Container />);
    expect(screen.getByText('Oops! Something went wrong please try again!')).toBeInTheDocument();
  });

  test('Should render input fields', async () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ addApplicationState: RequestStatus.Success });
    render(<Container />);
    const inputElems = await screen.getAllByRole('textbox');
    expect(inputElems.length).toBeTruthy();
  });
});
