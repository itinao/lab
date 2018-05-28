// @flow

import * as ReduxActions from 'redux-actions';
import Util from '../misc/util';

import type {
  CommonChangePageAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export type CommonState = {
  outdated: boolean,
  pageId: PageId,
};

const INITIAL_STATE: CommonState = {
  outdated: false,
  pageId: 'top',
};

export const CommonReducer = ReduxActions.handleActions({
  COMMON_CHANGE_PAGE(state, action: CommonChangePageAction) {
    return Util.updateState(state, {
      pageId: action.pageId,
    });
  },

  COMMON_UPDATE_OUTDATED(state, action: CommonUpdateOutdatedAction) {
    return Util.updateState(state, {
      outdated: action.outdated,
    });
  },
}, INITIAL_STATE);
