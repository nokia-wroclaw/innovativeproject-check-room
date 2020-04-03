/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EventListItem from '../EventListItem/EventListItem';
import {
   Day,
   DayBorder,
   GridlineRow,
   StyledCalendarDay,
   GridlineHour,
} from './CalendarDay_styles';
import DayName from './DayName/DayName';
import Event from './Event/Event';

const CalendarDay = ( { day, events } ) => {
   const eventsArray = events.map( ( event ) => (
      <EventListItem key={ event.id } eventData={ event } />
   ) );

   return (
      <StyledCalendarDay>
         <Day>
            <DayName day={ day } />
            <DayBorder />
            { _.times( 24 * 2, ( i ) => (
               <GridlineRow
                  key={ i }
                  style={ {
                     gridRow: `${( i + 1 ) * 2} / ${( i + 1 ) * 2}`,
                  } }
               />
            ) ) }
            { _.times( 24, ( i ) => (
               <GridlineHour
                  key={ i }
                  style={ {
                     gridRow: `${i * 4 + 2} / ${i * 4 + 2}`,
                  } }
               >
                  { i }:00
               </GridlineHour>
            ) ) }
            { events.map( ( event ) => (
               <Event key={ event.id } event={ event } />
            ) ) }
         </Day>
         { /* { eventsArray } */ }
      </StyledCalendarDay>
   );
};

CalendarDay.propTypes = {
   day: PropTypes.string.isRequired,
   events: PropTypes.arrayOf( PropTypes.object ).isRequired,
};

export default CalendarDay;
