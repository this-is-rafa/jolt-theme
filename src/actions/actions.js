const JoltSettings = window.JoltSettings;

export function getEvents() {
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
      })
      .catch(function(error) {
        console.log('Could not fetch events: ' + error.message);
      });
  }
}

export function setEvents(events) {
  return {
    type: 'SET_EVENTS',
    events: events
  }
}