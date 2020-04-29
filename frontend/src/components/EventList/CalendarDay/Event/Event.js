import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyledEvent, EventName, EventButton } from './Event_styles';
import EventModal from './EventModal/EventModal';

const Event = ( { event, isCompact } ) => {
   const [ isModalOpen, toggleModal ] = useReducer( ( value )=>!value, false );

   const startDateTime = moment( event.start.dateTime );
   const endDateTime = moment( event.end.dateTime );

   const startTime = startDateTime.hour() * 60 + startDateTime.minute();
   let endTime = endDateTime.hour() * 60 + endDateTime.minute();

   // Note: the code below assumes that events are grouped into days
   // by their start time, and multi-day events are not displayed
   // on days other than the first. While this situation is not optimal,
   // we shouldn't ever hit this scenario (we don't support multi-day events).
   if ( startDateTime.format( 'YYYY-MM-DD' ) !== endDateTime.format( 'YYYY-MM-DD' ) )
      endTime = 24 * 60;

   const gridRowStart = Math.floor( startTime / 15 ) + 2;
   const gridRowEnd = Math.floor( endTime / 15 ) + 2;

   const shouldDisplaySummary = gridRowEnd - gridRowStart >= 2;

   return (
      <StyledEvent
         label={ event.summary }
         style={ { gridRow: `${gridRowStart}/${gridRowEnd}` } }
      >
         <EventButton onClick={ toggleModal }>
            <EventName isCompact={ isCompact }>
               { shouldDisplaySummary ? event.summary || '(no name)' : '' }
            </EventName>
         </EventButton>
         { isModalOpen && <EventModal toggleModal={ toggleModal } event={ event } /> }
      </StyledEvent>
   );
};

Event.propTypes = {
   event: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      end: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      htmlLink: PropTypes.string.isRequired,
   } ).isRequired,
   isCompact: PropTypes.bool.isRequired,
};

export default Event;
