import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyledEvent, EventName, EventLink } from './Event_styles';

const Event = ( { event } ) => {
   const startDateTime = moment( event.start.dateTime );
   const startTime = startDateTime.hour() * 60 + startDateTime.minute();
   const gridRowStart = Math.floor( startTime / 15 ) + 2;
   const endDateTime = moment( event.end.dateTime );
   const endTime = endDateTime.hour() * 60 + endDateTime.minute();
   const gridRowEnd = Math.floor( endTime / 15 ) + 2;
   const isDisplaySummary = gridRowEnd - gridRowStart >= 2;

   return (
      <StyledEvent
         label={ event.summary }
         style={ { gridRow: `${gridRowStart}/${gridRowEnd}` } }
      >
         <EventLink
            href={ event.htmlLink }
            target="_blank"
            rel="noopener noreferrer"
         >
            <EventName>{ isDisplaySummary ? event.summary : '' }</EventName>
         </EventLink>
      </StyledEvent>
   );
};

Event.propTypes = {
   event: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
      start: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      end: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      htmlLink: PropTypes.string.isRequired,
   } ).isRequired,
};

export default Event;
