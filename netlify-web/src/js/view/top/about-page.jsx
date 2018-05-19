// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';

import type {RootState} from '../../store/root';

type Props = {
};

const className = ClassName('top', 'aboutPage');

class AboutPage extends React.Component<Props> {
  render() {
    return (
      <div className={className()}>
        <div className={className('section')}>
          <h1 className={className('title')}>
            Lab PWA
          </h1>
          <div className={className('detail')}>
            <p>1234567890.</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
  return {
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutPage);
