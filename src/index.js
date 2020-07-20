import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import App from './App';

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'

Amplify.configure(awsconfig);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const qcStore = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)),
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={qcStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
