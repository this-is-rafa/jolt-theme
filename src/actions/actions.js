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
      let showTime = new Date(event.start_timestamp);
      let showEnd = new Date( event.end_timestamp );
      
      if (now >= showTime && now <= showEnd) {
        return {
          type: 'SET_CURRENT_SHOW',
          currentShow: {
            title: event.title,
            timeStamp: event.start_timestamp || 0,
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