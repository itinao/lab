// @flow

import type {TopAction} from '../actions/top-actions';

export function changeTab(itemId: string): TopAction {
  return {
    pageId: itemId,
    type: 'TOP_CHANGE_TAB',
  }
}
