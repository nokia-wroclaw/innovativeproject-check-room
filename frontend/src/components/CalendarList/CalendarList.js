import React from 'react';
import PropTypes from 'prop-types';
import CalendarListItem from './CalendarListItem/CalendarListItem';
import { StyledCalendarList } from './CalendarList_styles';

const CalendarList = ( { calendarsData } ) => {

   const calendars = calendarsData.map( ( ( calendar )=> (
      <CalendarListItem key={ calendar.id } calendarData={ calendar } />
   ) ) );

   return (
      <StyledCalendarList>
         { calendarsData.length < 1 ? <h1>No Calendars</h1> : (
            calendars
         ) }
      </StyledCalendarList>
   );
};

CalendarList.propTypes = {
   calendarsData: PropTypes.arrayOf( PropTypes.object ),
};
CalendarList.defaultProps = {
   calendarsData: [],
};

export default CalendarList;
