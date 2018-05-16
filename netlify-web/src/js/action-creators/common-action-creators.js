// @flow

import * as Redux from 'redux';

import type {CommonAction} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export function changePage(pageId: PageId): CommonAction {
  return {
    pageId,
    type: 'COMMON_CHANGE_PAGE',
  };
}

export function reload(): any {
  return (_dispatch: Redux.Dispatch<CommonAction>) => {
    location.reload();
  };
}
