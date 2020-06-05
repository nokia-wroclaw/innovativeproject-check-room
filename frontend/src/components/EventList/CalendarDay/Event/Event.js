import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BackendContext from '../../../../services/communication/BackendContext';
import CalendarID from '../../../../services/communication/CalendarID';
import { StyledEvent, EventName, EventButton } from './Event_styles';
import showModal from './showModal/showModal';

const Event = ( { event, isCompact, onEventDeleted } ) => {
   const backend = useContext( BackendContext );

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

   const deleteEvent = () => {
      const calendarMail = event.organizer.email;
      // FIXME: pass calendar ID via React component tree.
      const calendarId = CalendarID.toId( calendarMail );
      const [ promise, ] = backend.command.deleteEvent( calendarId, event.id );
      promise.then( () => onEventDeleted( event.id ) );
   };

   return (
      <StyledEvent
         label={ event.summary }
         isOwned={ event.ownedByCurrentUser }
         style={ { gridRow: `${gridRowStart}/${gridRowEnd}` } }
      >
         <EventButton onClick={ () => showModal( event, deleteEvent ) }>
            <EventName isCompact={ isCompact }>
               { shouldDisplaySummary ? event.summary || '(no name)' : '' }
            </EventName>
         </EventButton>
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
      ownedByCurrentUser: PropTypes.bool,
      htmlLink: PropTypes.string.isRequired,
      organizer: PropTypes.shape( {
         email: PropTypes.string.isRequired,
      } ).isRequired,
   } ).isRequired,
   isCompact: PropTypes.bool.isRequired,
   onEventDeleted: PropTypes.func,
};

Event.defaultProps = {
   onEventDeleted: () => { },
};

export default Event;
