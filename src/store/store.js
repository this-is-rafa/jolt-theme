import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  loading: 0,
  events: [],
  currentShow: {
    title: "Jolt Mix",
  },
  search: {
    query: "",
    results: [],
    searching: false,
  },
  postList: {
    posts: [],
    page: 1,
    getPosts: true,
  },
  newsList: {
    news: [],
    page: 1,
    getNews: true,
  },
  twitchStatus: {
    live: false,
    override: false,
    player: null,
  },
  audioStatus: {
    playing: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, loading: state.loading + 1 };
    case "UNLOAD":
      return { ...state, loading: state.loading - 1 };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "SET_CURRENT_SHOW":
      return {
        ...state,
        currentShow: action.currentShow,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        search: {
          ...state.search,
          results: action.searchResults,
        },
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: {
          ...state.search,
          query: action.searchQuery,
        },
      };
    case "SET_SEARCH_STATUS":
      return {
        ...state,
        search: {
          ...state.search,
          searching: action.searchStatus,
        },
      };
    case "SET_POSTLIST":
      return {
        ...state,
        postList: action.postList,
      };
    case "SET_NEWSLIST":
      return {
        ...state,
        newsList: action.newsList,
      };
    case "SET_TWITCH_STATUS":
      return {
        ...state,
        twitchStatus: action.twitchStatus,
      };
    case "SET_AUDIO_STATUS":
      return {
        ...state,
        audioStatus: action.audioStatus,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
