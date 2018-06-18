// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as CommonActionCreators from './action-creators/common-action-creators';

import TopPage from './view/top/page';
import NewsContentPage from './view/news-content/page';
import Snackbar from './view/common/snackbar';

import type {PageId} from './model/page-id';
import type {CommonAction} from './actions/common-actions';
import type {RootState} from './store/root';

import Firebase from './misc/firebase';

type Props = {
  onReloadButtonClick: () => void,
  onChangeButtonClick: () => void,
  state: RootState,
};

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).firebase = new Firebase();
    (this: any).initializeServiceWorker();
  }

  initializeServiceWorker() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('service-worker.js').then((reg) => {
        (this: any).firebase.initializeMessaging(reg);
      }).catch((err) => {
        console.error('Registration failed:', err);
      });
    }
  }

  render() {
    const {pageId} = this.props.state.common;
    console.log('pageId: ' + pageId);
    return (
      <div>
        <TopPage/>
        <NewsContentPage
          visible={pageId === 'news-content'}
        />
        <Snackbar
          buttonTitle="Refresh"
          onButtonClick={this.props.onReloadButtonClick}
          text="Updates ready to install"
          visible={this.props.state.common.outdated}
          />
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {state};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<CommonAction>) {
  return {
    onReloadButtonClick() {
      dispatch(
        CommonActionCreators.reload(),
      );
    },
    onChangeButtonClick(pageId: PageId) {
      dispatch(
        CommonActionCreators.changePage(pageId),
      );
    },
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
