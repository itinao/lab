import * as ReactDOM from "react-dom";
import * as React from "react";
import { computed, action, observable } from "mobx";
import {observer} from 'mobx-react'

interface IProps {
  data: AppState;
}

class AppState {
  @observable counter;

  constructor() {
    this.counter = 0;
  }

  @computed get twice() {
    return this.counter * 2;
  }

  @action
  incrementLazy() {
    this.counter -= 1;
    setTimeout(() => {
      this.counter += 2;
    }, 100);
  }
}

@observer
class App extends React.Component<IProps, {}> {
  render() {
    return <div className="app">{this.props.data.twice}</div>
  }
}

const el = document.getElementById('appContainer');
const appState = new AppState();
ReactDOM.render(<App data={appState} />, el);

/*
setInterval(() => {
  appState.counter += 1;
}, 1000);
*/
appState.incrementLazy();