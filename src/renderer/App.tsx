import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ErrorBoundary from './components/ErrorBoundary';
import history from './core/history';
import store from './core/store';
import Routes from './routes';
import '../resources/css/app.global.scss';

const App = () =>
    <Provider store={store} context={ReactReduxContext}>
        <ErrorBoundary>
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <Routes />
            </ConnectedRouter>
        </ErrorBoundary>
    </Provider>;

export default hot(App);