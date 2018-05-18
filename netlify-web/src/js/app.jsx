// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as CommonActionCreators from './action-creators/common-action-creators';

import TopPage from './view/top/page';
import type {CommonAction} from './actions/common-actions';
import type {RootState} from './store/root';

type Props = {
  onReloadButtonClick: () => void,
  state: RootState,
};

class App extends React.Component<Props> {
  render() {
    const {pageId} = this.props.state.common;
    console.log(pageId);

    return (
      <div>
        <TopPage/>
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
