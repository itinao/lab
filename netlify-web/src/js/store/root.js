// @flow

import * as Redux from 'redux';

import {CommonReducer} from './common';
import type {CommonState} from './common';

export type RootState = {
  common: CommonState,
};

export const RootReducer = Redux.combineReducers({
  common: CommonReducer,
});
