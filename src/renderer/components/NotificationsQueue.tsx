import React, { Component } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { forEach } from 'lodash';
import Actions from '../core/actions/queue';

//import './NotificationsQueue.global.css';
import {RootState, Notification} from "../core/types";

const mapState = (state: RootState) => ({
  notifications: state.queue.notifications
});

const mapDispatch = {
  cancel: (id: any) => Actions.notificationsQueueRemove(id)
};

const connector = connect(
  mapState,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>

class NotificationsQueue extends Component<PropsFromRedux> {
  renderItems() {
    const items: JSX.Element[] = [];
    const { notifications, cancel } = this.props;
    forEach(notifications, (req: Notification) => {
      const { type, message } = req.data;
      items.push(
        <div key={req.id} className={`toast toast-just-text toast-${type}`}>
          <button
            type="button"
            className="toast-close-button"
            aria-label="Close"
            onClick={() => {
              cancel(req.id);
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="toast-message">Messages</div>
          <div className="toast-message">{message}</div>
        </div>
      );
    });
    items.reverse();
    return items;
  }

  render() {
    const { notifications } = this.props;
    const items = this.renderItems();
    const count = Object.keys(notifications).length;

    if (count === 0) {
      return null;
    }
    return (
      <div
        id="toast-top-right"
        className="toast-top-right"
        aria-live="polite"
        role="alert"
      >
        {items}
      </div>
    );
  }
}

export default connector(NotificationsQueue);
