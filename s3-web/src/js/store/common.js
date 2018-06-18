// @flow

import * as ReduxActions from 'redux-actions';
import Util from '../misc/util';

import type {
  CommonChangePageAction,
  CommonChangeNewsContentAction,
  CommonUpdateOutdatedAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export type CommonState = {
  outdated: boolean,
  newsData: any,
  pageId: PageId,
};

const INITIAL_STATE: CommonState = {
  outdated: false,
  newsData: {},
  pageId: 'top',
};

export const CommonReducer = ReduxActions.handleActions({
  COMMON_CHANGE_PAGE(state, action: CommonChangePageAction) {
    return Util.updateState(state, {
      pageId: action.pageId,
    });
  },

  COMMON_CHANGE_NEWS_CONTENT(state, action: CommonChangeNewsContentAction) {
    return Util.updateState(state, {
      newsData: action.newsData,
    });
  },

  COMMON_UPDATE_OUTDATED(state, action: CommonUpdateOutdatedAction) {
    return Util.updateState(state, {
      outdated: action.outdated,
    });
  },
}, INITIAL_STATE);
