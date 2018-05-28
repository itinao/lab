// @flow

import * as ReduxActions from 'redux-actions';

import Util from '../misc/util';

import type {
  TopChangeTabAction,
} from '../actions/top-actions';

export type TopState = {
  tabId: string,
};

const INITIAL_STATE: TopState = {
  tabId: 'payment',
};

export const TopReducer = ReduxActions.handleActions({
  TOP_CHANGE_TAB(state, action: TopChangeTabAction) {
    return Util.updateState(state, {
      tabId: action.pageId,
    });
  },
}, INITIAL_STATE);
