import * as types from './types';
import RequestStatus from '../RequestStatus';

export const initialState: types.ApplicationsState = {
  setApplicationsState: RequestStatus.Initial,
  addApplicationState: RequestStatus.Initial,
  companies: [],
  postData: {},
};

const applicationReducer = (state = initialState, action: types.ApplicationsActionTypes) => {
  switch (action.type) {
    case types.SET_APPLICATIONS_REQUESTED:
      return { ...state, setApplicationsState: RequestStatus.Requested };
    case types.SET_APPLICATIONS_SUCCESS:
      return { ...state, setApplicationsState: RequestStatus.Success, companies: action.payload };
    case types.SET_APPLICATIONS_FAILED:
      return { ...state, setApplicationsState: RequestStatus.Failed, companies: [] };
    case types.ADD_APPLICATION_REQUESTED:
      return { ...state, addApplicationState: RequestStatus.Requested };
    case types.ADD_APPLICATION_SUCCESS:
      return { ...state, addApplicationState: RequestStatus.Success, postData: action.payload };
    case types.ADD_APPLICATION_FAILED:
      return { ...state, addApplicationState: RequestStatus.Failed };
    default:
      return state;
  }
};

export default applicationReducer;
