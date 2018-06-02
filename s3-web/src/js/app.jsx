// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as CommonActionCreators from './action-creators/common-action-creators';

import firebase from 'firebase/app';
import 'firebase/messaging';
import credentials from './credentials'

import TopPage from './view/top/page';
import Snackbar from './view/common/snackbar';

import type {CommonAction} from './actions/common-actions';
import type {RootState} from './store/root';

import request from './misc/request';

type Props = {
  onReloadButtonClick: () => void,
  state: RootState,
};

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.init();
  }

  init() {
    if (navigator.serviceWorker) {
      firebase.initializeApp(credentials);
      const messaging = firebase.messaging();

      navigator.serviceWorker.register('service-worker.js').then((reg) => {
        messaging.useServiceWorker(reg);
        messaging.requestPermission().then(() => {
          console.log('Notification permission granted.');
          messaging.getToken().then((currentToken) => {
            messaging.onMessage((payload) => {
              console.log("Message received. ", payload)
            })
            request.tokenRegister(currentToken, () => {
              console.log("finished request.tokenRegister");
            }, () => {});
            console.log(currentToken);
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err)
          });
        }).catch((err) => {
          console.log('Unable to get permission to notify.', err)
        });

        messaging.onTokenRefresh(() => {
          messaging.getToken().then((refreshedToken) => {
            request.tokenRegister(refreshedToken, () => {
              console.log("finished request.tokenRegister");
            }, () => {});
            console.log('Token refreshed: ' + refreshedToken)
          }).catch((err) => {
            console.log('Unable to retrieve refreshed token ', err)
          })
        });
      }).catch(function(err) {
        console.error('Registration failed:', err);
      });
    }
  }

  render() {
    const {pageId} = this.props.state.common;
    return (
      <div>
        <TopPage/>
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
