// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';

import * as CommonActionCreators from './action-creators/common-action-creators';
import App from './app';
import Store from './store';

export default function() {
  const store = Store.create();

  setTimeout(() => {
    store.dispatch(
      CommonActionCreators.checkForUpdate(),
    );
  }, 4000);

  return (
    <ReactRedux.Provider store={store}>
      <App/>
    </ReactRedux.Provider>
  );
}
