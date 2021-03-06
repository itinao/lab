import * as React from "react";
import { Provider } from 'mobx-react';
import CountStore from '../store/CountStore';
import Counter from '../components/Counter';

// create store
const stores = new CountStore();

export default class CountContainer extends React.Component {
  render() {
    return (
      <Provider count={stores}>
        <Counter />
      </Provider>
    );
  }
}
