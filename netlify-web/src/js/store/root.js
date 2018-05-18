// @flow

import * as Redux from 'redux';

import {TopReducer} from './top';
import {CommonReducer} from './common';
import type {TopState} from './top';
import type {CommonState} from './common';

export type RootState = {
  top: TopState,
  common: CommonState,
};

export const RootReducer = Redux.combineReducers({
  top: TopReducer,
  common: CommonReducer,
});
