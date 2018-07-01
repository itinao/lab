import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CountStoreType } from '../store/CountStore';

type Props = {
    count?: CountStoreType
};

@inject('count')
@observer
class Counter extends Component<Props> {
  render() {
    const { count } = this.props;

    return (
      <div>
        Counter : {count!.num} <br />
        < button onClick={count!.onIncrement} > + </button>
        < button onClick={count!.onDecrement} > - </button>
        < br /> GetDoubleCount: {count!.getDoubleCount}
      </div>
    );
  }
}

export default Counter;
