import React from 'react';
import PropTypes from 'prop-types';
import { StyledCalendarListItem, CalendarHeader, CalendarLink, CalendarDescription } from './CalendarListItem_styles';

const CalendarListItem = ( { calendarData } ) => {
   const { description, summary,id } = calendarData;

   return (
      <StyledCalendarListItem>
         <CalendarLink to={ `/room/${id.split( '@' )[0]}` }>

            <CalendarHeader >{ summary }</CalendarHeader>
            <CalendarDescription >
               { description || 'No description.' }
               { /* there should be more info in the future: todo in caendars first */ }
            </CalendarDescription>
         </CalendarLink>
      </StyledCalendarListItem>
   );
};

CalendarListItem.propTypes = {
   calendarData: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
   } ).isRequired,
};


export default CalendarListItem;