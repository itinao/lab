// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import {RootReducer} from './store/root';

export default {
  create(): Redux.Store<*, *> {
    const store = Redux.createStore(
      RootReducer,
      (Redux.compose(
        Redux.applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
          window.__REDUX_DEVTOOLS_EXTENSION__() :
          (f) => f,
      ): any),
    );

    return store;
  },
}
