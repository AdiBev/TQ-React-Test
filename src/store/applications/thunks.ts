import axios from 'axios';
import { Company } from '../../types';
import { AppThunk } from '../store';
import {
  addApplications,
  addApplicationsError,
  addApplicationsRequest,
  setApplications,
  setApplicationsError,
  setApplicationsRequest,
} from './actions';

/**
 * Returns all applications from the API.
 */

const fetchCompanies = (apiKey: string) => {
  return axios.get(`/Companies?key=${apiKey}`);
};

export function thunkGetApplication(apiKey: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(setApplicationsRequest());
      const response = await fetchCompanies(apiKey);
      dispatch(setApplications(response.data));
    } catch (err) {
      dispatch(setApplicationsError());
    }
  };
}

/**
 * Posts an applications to the API.
 */

const postCompany = (postData: Company | {}, apiKey: string) => {
  return axios.post(`/Companies?key=${apiKey}`, postData);
};

export function thunkPostApplication(postData: Company | {}, apiKey: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(addApplicationsRequest());
      const response = await postCompany(postData, apiKey);
      dispatch(addApplications(response.data));
    } catch (err) {
      dispatch(addApplicationsError());
    }
  };
}
