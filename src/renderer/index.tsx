import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ErrorBoundary from './components/ErrorBoundary';
import { AppContainer } from 'react-hot-loader';
import history from './core/history';
import store from './core/store';
import Routes from './routes';
import '../resources/css/app.global.scss';

render(
  <AppContainer>
      <Provider store={store} context={ReactReduxContext}>
          <ErrorBoundary>
              <ConnectedRouter history={history} context={ReactReduxContext}>
                  <Routes />
              </ConnectedRouter>
          </ErrorBoundary>
      </Provider>
  </AppContainer>,
document.body
);

