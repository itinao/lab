// @flow

import * as ReduxActions from 'redux-actions';
import Util from '../misc/util';

import type {
  CommonChangePageAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export type CommonState = {
  pageId: PageId,
};

const INITIAL_STATE: CommonState = {
  pageId: 'top',
};

export const CommonReducer = ReduxActions.handleActions({
  COMMON_CHANGE_PAGE(state, action: CommonChangePageAction) {
    return Util.updateState(state, {
      pageId: action.pageId,
    });
  }
 }, INITIAL_STATE);
