import { Company } from '../../types';
import RequestStatus from '../RequestStatus';

export const SET_APPLICATIONS_REQUESTED = 'SET_APPLICATIONS_REQUESTED';
export const SET_APPLICATIONS_SUCCESS = 'SET_APPLICATIONS_SUCCESS';
export const SET_APPLICATIONS_FAILED = 'SET_APPLICATIONS_FAILED';

export const ADD_APPLICATION_REQUESTED = 'ADD_APPLICATION_REQUESTED';
export const ADD_APPLICATION_SUCCESS = 'ADD_APPLICATION_SUCCESS';
export const ADD_APPLICATION_FAILED = 'ADD_APPLICATION_FAILED';

export type ApplicationsState = {
  setApplicationsState: RequestStatus;
  addApplicationState: RequestStatus;
  companies: Company[];
  postData: Company | {};
};

type SetApplicationsRequestedAction = {
  type: typeof SET_APPLICATIONS_REQUESTED;
};

type SetApplicationsSuccessAction = {
  type: typeof SET_APPLICATIONS_SUCCESS;
  payload: any;
};

type SetApplicationsFailedAction = {
  type: typeof SET_APPLICATIONS_FAILED;
};

type AddApplicationRequestedAction = {
  type: typeof ADD_APPLICATION_REQUESTED;
};

type AddApplicationsFailedAction = {
  type: typeof ADD_APPLICATION_FAILED;
};

type AddApplicationSuccessAction = {
  type: typeof ADD_APPLICATION_SUCCESS;
  payload: any;
};

export type ApplicationsActionTypes =
  | SetApplicationsRequestedAction
  | SetApplicationsSuccessAction
  | SetApplicationsFailedAction
  | AddApplicationRequestedAction
  | AddApplicationSuccessAction
  | AddApplicationsFailedAction;
