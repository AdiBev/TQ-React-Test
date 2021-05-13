import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import Layout from './views/Layout';

import './css/main.scss';
import { RootState } from './store';
import RequestStatus from './store/RequestStatus';

const history = createBrowserHistory();

const App: React.FunctionComponent = () => {
  const [error, setError] = useState(false);

  const { addApplicationState, setApplicationsState } = useSelector((state: RootState) => state.applications);

  //set base url
  axios.defaults.baseURL = 'https://tqinterviewapi.azurewebsites.net/api';

  const getApiKey = async () => {
    try {
      return await axios.get('/Companies/key');
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    let apiKey = localStorage.getItem('apiKey');

    //fetch api key if key is empty or if api req fails
    (!apiKey ||
      apiKey === 'undefined' ||
      error ||
      setApplicationsState === RequestStatus.Failed ||
      addApplicationState === RequestStatus.Failed) &&
      getApiKey()
        .then(({ data }) => {
          localStorage.setItem('apiKey', data);
          error && setError(false);
        })
        .catch((err) => err && setError(true));
  }, [error, addApplicationState, setApplicationsState]);

  return (
    <Router history={history}>
      <Layout />
    </Router>
  );
};

export default App;
