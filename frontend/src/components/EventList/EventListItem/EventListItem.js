import React from 'react';
import PropTypes from 'prop-types';
import {
   StyledEventListItem,
   EventHeader,
   EventLink,
   EventDescription,
   DateItem,
} from './EventListItem_styles';

const EventListItem = ( { eventData } ) => {
   const {
      summary,
      htmlLink,
      start: { dateTime: startTime },
      end: { dateTime: endTime },
   } = eventData;
   const startDate = new Date( startTime );
   const endDate = new Date( endTime );

   return (
      <StyledEventListItem>
         <EventLink href={ htmlLink }>
            <EventHeader>{ summary }</EventHeader>
            <EventDescription>
               <DateItem>
                  Day: { startDate.toLocaleDateString() } 
               </DateItem>
               <DateItem>
                  From: { startDate.toLocaleTimeString() } 
               </DateItem>
               { startDate.toLocaleDateString() !==
                  endDate.toLocaleDateString() && (
                  <DateItem>End Day: { endDate.toLocaleDateString() }</DateItem> ) }
               <DateItem>
               To: { endDate.toLocaleTimeString() }
               </DateItem>
            </EventDescription>
         </EventLink>
      </StyledEventListItem>
   );
};

EventListItem.propTypes = {
   eventData: PropTypes.shape( {
      htmlLink: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      start: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      end: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      // description: PropTypes.string,
   } ).isRequired,
};

export default EventListItem;
