// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';

import App from './app';
import Store from './store';

export default function() {
  const store = Store.create();

  return (
    <ReactRedux.Provider store={store}>
      <App/>
    </ReactRedux.Provider>
  );
}
