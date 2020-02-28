import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { saveState, loadState } from './localStorage';

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    // Redux Configuration
    const middleware = [];
    
    // Thunk Middleware
    middleware.push(thunk);

    // Saga Middleware
    middleware.push(sagaMiddleware);

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        // middleware.push(logger);
    }

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);
    
    // Apply Middleware & Compose Enhancers
    const enhancer = compose(applyMiddleware(...middleware));

    const state = Object.assign({}, loadState());
    // Create Store
    const store = createStore(rootReducer, state, enhancer);

    const settingsStore = require('electron').remote.getGlobal('sharedObject').store;
    let previousState;
    // Save store to local storage
    store.subscribe(
        throttle(() => {
            const apiState = store.getState().api;
            saveState({
                api: apiState
            });
            if (previousState !== apiState) {
                settingsStore.set('api.host', apiState.host);
            }
            previousState = apiState;
        }, 1000)
    );

    // Run saga
    sagaMiddleware.run(rootSaga);

    return store;
};

const storeInstance = configureStore();

export default storeInstance;
