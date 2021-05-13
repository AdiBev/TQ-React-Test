import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  ADD_APPLICATION_FAILED,
  ADD_APPLICATION_REQUESTED,
  SET_APPLICATIONS_FAILED,
  SET_APPLICATIONS_REQUESTED,
} from '../types';
import { thunkGetApplication, thunkPostApplication } from '../thunks';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get applications', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  test(`It should dispatch SET_APPLICATIONS_REQUESTED, SET_APPLICATIONS_FAILED`, async () => {
    axiosMock.onGet('/Companies', { params: { key: '123dgf' } }).networkError();

    const expectedActions = [{ type: SET_APPLICATIONS_REQUESTED }, { type: SET_APPLICATIONS_FAILED }];
    const store = mockStore();
    await store.dispatch(thunkGetApplication('123455') as any);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Post applications', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  test('It should dispatch ADD_APPLICATION_REQUESTED, ADD_APPLICATION_FAILED', async () => {
    const payload = { name: 'test', url: 'http://g.com', address: '123 test', employees: [] };
    axiosMock
      .onPost('https://tqinterviewapi.azurewebsites.net/api/Companies', { params: { key: '2344' } })
      .networkError();

    const expectedActions = [{ type: ADD_APPLICATION_REQUESTED }, { type: ADD_APPLICATION_FAILED }];
    const store = mockStore();
    await store.dispatch(thunkPostApplication(payload, '1234') as any);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
