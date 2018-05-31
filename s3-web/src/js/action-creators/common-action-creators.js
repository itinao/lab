// @flow

import * as Redux from 'redux';

import Version from '../app/version';
import type {CommonAction} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export function changePage(pageId: PageId): CommonAction {
  return {
    pageId,
    type: 'COMMON_CHANGE_PAGE',
  };
}

export function checkForUpdate(): any {
  return (dispatch: Redux.Dispatch<CommonAction>) => {
    Version.checkForUpdate().then((outdated) => {
      Version.addOnCompleteUpdateListener((_data) => {
        dispatch({
          outdated,
          type: 'COMMON_UPDATE_OUTDATED',
        });
      });
      Version.requestUpdatingCache();
    });
  };
}

export function reload(): any {
  return (_dispatch: Redux.Dispatch<CommonAction>) => {
    location.reload();
  };
}
