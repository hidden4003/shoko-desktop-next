import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { forEach } from 'lodash';
import {
  API_QUEUE_ADD,
  API_QUEUE_REMOVE,
  API_QUEUE_UPDATE,
  NOTIFICATIONS_QUEUE_ADD,
  NOTIFICATIONS_QUEUE_REMOVE,
} from '../actions/queue';
import {Notification, QueueRequest} from "../types";

const api = handleActions<{[key: string]: QueueRequest}, QueueRequest>(
  {
    [API_QUEUE_ADD]: (state, action) => {
      let count = 0;
      const items: {[key: string]: QueueRequest} = {};
      forEach(state, (value, key) => {
        if (value.status === 'Processing' || value.status === 'Pending') {
          items[key] = value;
          return;
        }
        count += 1;
        if (count < 10) {
          items[key] = value;
        }
      });

      return Object.assign({}, items, {
        [action.payload.requestId]: action.payload,
      });
    },
    [API_QUEUE_UPDATE]: (state, action) => {
      const reqId = action.payload.requestId;
      return Object.assign({}, state, {
        [reqId]: Object.assign({}, state[reqId] || {}, action.payload),
      });
    },
    [API_QUEUE_REMOVE]: (state, action) => {
      const reqId = action.payload.requestId;
      if (!state[reqId]) {
        return state;
      }
      const items = Object.assign({}, state);
      delete items[reqId];
      return items;
    },
  },
    {},
);

const notifications = handleActions<{[key: string]: Notification}, Notification>(
  {
    [NOTIFICATIONS_QUEUE_ADD]: (state, action) => Object.assign({}, state, { [action.payload.id]: action.payload }),
    [NOTIFICATIONS_QUEUE_REMOVE]: (state, action) => {
      const reqId = action.payload.id;
      if (!state[reqId]) {
        return state;
      }
      const items = Object.assign({}, state);
      delete items[reqId];
      return items;
    },
  },
  {}
);

export default combineReducers({
  api,
  notifications,
});
