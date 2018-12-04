import { createStore } from 'redux';

const initialState = {
  loading: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {loading: state.loading + 1});
    case 'UNLOAD':
      return Object.assign({}, state, {loading: state.loading - 1});
    default:
      return state;
  }
}


const store = createStore(reducer);

export default store;