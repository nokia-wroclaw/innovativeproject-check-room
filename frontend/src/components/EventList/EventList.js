import React from 'react';
import PropTypes from 'prop-types';
import { StyledEventList } from './EventList_styles';
import EventListItem from './EventListItem/EventListItem';

const EventList = ( { eventsData } ) => {
   
   const events = eventsData.map( ( ( event )=> (
      <EventListItem key={ event.id } eventData={ event } />
   ) ) );
   
   return (
      <StyledEventList>
         { eventsData.length < 1 ? <h1>No events</h1> : (
            events
         ) }
      </StyledEventList>
   );
};

EventList.propTypes = {
   eventsData: PropTypes.arrayOf( PropTypes.object ),
};
EventList.defaultProps = {
   eventsData: [],
};

export default EventList;