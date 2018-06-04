// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CommonActionCreators from '../../action-creators/common-action-creators';
import ClassName from '../../misc/class-name';
import AppBar from '../common/app-bar';

import type {RootState} from '../../store/root';

type Props = {
  onCloseButtonClick: () => void,
  visible: boolean,
  state: RootState,
};

type State = {
  action: 'show' | 'hide' | null,
};

const EMPTY_HANDLER = () => {};
const className = ClassName('news-content', 'page');

class NewsContentPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      action: null,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps: Props) {
    const oldVisible = this.props.visible;
    const newVisible = newProps.visible;

    if (oldVisible && !newVisible) {
      this.setState({
        action: 'hide',
      });
    } else if (!oldVisible && newVisible) {
      this.refs.content.scrollTop = 0;
      this.setState({
        action: 'show',
      });
    }
  }

  render() {
    const {state} = this.props;
    const modifierMap: {[string]: boolean} = {};
    if (this.state.action) {
      modifierMap[this.state.action] = true;
    }

    return (
      <div className={className(modifierMap)}>
        <div className={className('appBarLayout')}>
          <AppBar title="News">
            <button
              className="common-appBarButton"
              onClick={this.props.onCloseButtonClick}
              onTouchStart={EMPTY_HANDLER}
            >
              Close
            </button>
          </AppBar>
        </div>
        <div ref="content" className={className('content')} dangerouslySetInnerHTML={{__html: state.common.newsData.content}}></div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {state};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
  return {
    onCloseButtonClick() {
      dispatch(
        CommonActionCreators.changePage('top'),
      );
    },
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NewsContentPage);
