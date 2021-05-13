import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as redux from 'react-redux';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RequestStatus from './store/RequestStatus';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const Container = () => (
  <ReduxProvider store={mockStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

test('Renders <App />', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ addApplicationState: RequestStatus.Success });
  render(<Container />);
});
