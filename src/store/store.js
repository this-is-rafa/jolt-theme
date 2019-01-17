import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  loading: 0,
  events: [],
  currentShow: {
    title: "Jolt Rotation"
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD':
      return {...state, loading: state.loading + 1}
    case 'UNLOAD':
      return {...state, loading: state.loading - 1}
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.events
      }
    case 'SET_CURRENT_SHOW':
      return {
        ...state,
        currentShow: action.currentShow
      }
    default:
      return state;
  }
}


const store = createStore(reducer, applyMiddleware(thunk));

export default store;