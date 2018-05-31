// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';

import type {RootState} from '../../store/root';

type Props = {
};

const className = ClassName('top', 'cameraPage');

class CameraPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onCameraClick = this.onCameraClick.bind(this);
  }

  onCameraClick(e) {
    const video = ReactDOM.findDOMNode(this.refs.video);
    const medias = {audio : false, video : true};
    navigator.getUserMedia(
      medias,
      (stream) => {
        video.srcObject = stream;
      }, (err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className={className()}>
        <div className={className('section')}>
          <div className={className('detail')}>
            <button
              onClick={this.onCameraClick}
            >
              Camera
            </button>
            <video ref="video" autoPlay playsInline></video>
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

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CameraPage);
