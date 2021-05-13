import * as types from './types';

/**
 * Sets the applications provided to the Redux store.
 */

export const setApplicationsRequest = (): types.ApplicationsActionTypes => ({ type: types.SET_APPLICATIONS_REQUESTED });

export function setApplications(applications: any): types.ApplicationsActionTypes {
  return {
    type: types.SET_APPLICATIONS_SUCCESS,
    payload: applications,
  };
}

export const setApplicationsError = (): types.ApplicationsActionTypes => ({
  type: types.SET_APPLICATIONS_FAILED,
});

export const addApplicationsRequest = (): types.ApplicationsActionTypes => ({ type: types.ADD_APPLICATION_REQUESTED });

export const addApplications = (payload: any) => ({ type: types.ADD_APPLICATION_SUCCESS, payload });

export const addApplicationsError = () => ({ type: types.ADD_APPLICATION_FAILED });
