// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as CommonActionCreators from './action-creators/common-action-creators';

import type {CommonAction} from './actions/common-actions';
import type {RootState} from './store/root';

type Props = {
  onReloadButtonClick: () => void,
  state: RootState,
};

class App extends React.Component<Props> {
  render() {
    const {pageId} = this.props.state.common;

    return (
      <div>
        <div>abc {pageId}</div>
        <button type="button" onClick={this.props.onChangeButtonClick.bind(this, "setting")}>change setting</button>
        <button type="button" onClick={this.props.onChangeButtonClick.bind(this, "calc")}>change calc</button>
        <button type="button" onClick={this.props.onReloadButtonClick}>reload</button>
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
