import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import api from './api';
import ui from './ui';
import queue from './queue';

const rootReducer = combineReducers({
  router: connectRouter(history),
  api,
  ui,
  queue,
});

export default rootReducer;
