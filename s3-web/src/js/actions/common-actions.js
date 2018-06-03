// @flow

import type {PageId} from '../model/page-id';

export type CommonChangePageAction = {
  pageId: PageId,
  type: 'COMMON_CHANGE_PAGE',
};

export type CommonChangeNewsContentAction = {
  newsData: any,
  type: 'COMMON_CHANGE_NEWS_CONTENT',
};

export type CommonUpdateOutdatedAction = {
  outdated: boolean,
  type: 'COMMON_UPDATE_OUTDATED',
};

export type CommonAction = CommonChangePageAction | CommonChangeNewsContentAction | CommonUpdateOutdatedAction;
