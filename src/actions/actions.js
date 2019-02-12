const JoltSettings = window.JoltSettings;

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
      let showTime = new Date(event.timeStamp * 1000); //convert from php unix time
      let showEnd = new Date( (event.timeStamp + 3600) * 1000 );
      
      if (now >= showTime && now <= showEnd) {
        return {
          type: 'SET_CURRENT_SHOW',
          currentShow: {
            title: event.title,
            timeStamp: event.timeStamp || 0,
            postId: event.post_id || 0,
            bannerImage: event.bannerImage || undefined
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