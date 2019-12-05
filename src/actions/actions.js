const JoltSettings = window.JoltSettings;

export const incrementLoad = () => {
  return(dispatch) => {
    dispatch({type: 'LOAD'});
  }
}

export const decrementLoad = () => {
  return(dispatch) => {
    dispatch({type: 'UNLOAD'});
  }
}

export const getEvents = () => {
  return(dispatch) => {
    fetch(JoltSettings.URL.api + '/jolt-cal')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        let allEvents = [];
        results.forEach(function(single) {
          allEvents.push(single);
        });

        dispatch(setEvents(allEvents));
        dispatch(setCurrentShow(allEvents));
      })
      .catch(function(error) {
        console.log('Could not fetch events: ' + error.message);
      });
  }
}

export const setEvents = (events) => {
  return {
    type: 'SET_EVENTS',
    events: events
  }
}

export const setCurrentShow = (events) => {
  if (events.length > 0) {
    let now = new Date();
    for (let event of events[0].events) {
      let showTime = new Date(event.start_timestamp);
      let showEnd = new Date( event.end_timestamp );
      
      if (now >= showTime && now <= showEnd) {
        return {
          type: 'SET_CURRENT_SHOW',
          currentShow: {
            title: event.title,
            timeStamp: event.start_timestamp || 0,
            postId: event.post_id || 0,
            bannerImage: event.banner_image || undefined
          }
        }
      }
    }
  }

  return {
    type: 'SET_CURRENT_SHOW',
    currentShow: {
      title: 'Jolt Mix'
    }
  }

}

export const getSearch = (query) => {
  return(dispatch) => {
    dispatch(setSearchQuery(query));
    dispatch(setSearchStatus(true));
    if (query === "") {
      dispatch(setSearchStatus(false));
      return dispatch(setSearchResults([]));
    }

    fetch(JoltSettings.URL.api + '/artists?search=' + query + '&_embed&per_page=12')
      .then( function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then( function(results) {
        let searchResults = [];
        results.forEach(function(single) {
          searchResults.push(single);
        });
        dispatch(setSearchResults(searchResults));
        dispatch(setSearchStatus(false));
      })
      .catch(function(error) {
        console.log('Could not fetch events: ' + error.message);
      });
  }
}

export const setSearchResults = (searchResults) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    searchResults: searchResults
  }
}

export const setSearchQuery = (searchQuery) => {
  return {
    type: 'SET_SEARCH_QUERY',
    searchQuery: searchQuery
  }
}

export const setSearchStatus = (searchStatus) => {
  return {
    type: 'SET_SEARCH_STATUS',
    searchStatus: searchStatus
  }
}

export const setPostList = (postList) => {
  return(dispatch) => 
  dispatch(
    {
      type: 'SET_POSTLIST',
      postList: postList
    }
  );
}

export const setTwitchStatus = (twitchStatus) => {
  return {
    type: 'SET_TWITCH_STATUS',
    twitchStatus: twitchStatus
  }
}