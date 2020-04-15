import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
   Day,
   DayBorder,
   GridlineRow,
   StyledCalendarDay,
   GridlineHour,
   AllDayButton,
   DayInfo,
} from './CalendarDay_styles';
import DayName from './DayName/DayName';
import Event from './Event/Event';

const CalendarDay = ( { day, events } ) => {
   const [ isFullDay, toggleFullDay ] = useReducer( ( state ) => !state, false );

   return (
      <StyledCalendarDay>
         <Day isFullDay={ isFullDay }>
            <DayInfo>
               <DayName day={ day } />
               <AllDayButton onClick={ toggleFullDay }>
                  { isFullDay? 'Hide' : 'Show' } full day
               </AllDayButton>
            </DayInfo>
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
                     gridRow: `${i * 4 + 2} / ${i * 4 + 4}`,
                  } }
               >
                  { i }:00
               </GridlineHour>
            ) ) }
            { events.map( ( event ) => (
               <Event key={ event.id } event={ event } />
            ) ) }
         </Day>
      </StyledCalendarDay>
   );
};

CalendarDay.propTypes = {
   day: PropTypes.string.isRequired,
   events: PropTypes.arrayOf( PropTypes.object ).isRequired,
};

export default CalendarDay;
