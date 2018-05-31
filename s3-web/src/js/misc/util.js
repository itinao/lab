// @flow

const Util = {
  updateState<State>(state: State, newState: $Shape<State>): State {
    return Object.assign({}, state, newState);
  },
};

export default Util;
