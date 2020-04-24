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
   EventsGrid,
} from './CalendarDay_styles';
import DayName from './DayName/DayName';
import Event from './Event/Event';

const CalendarDay = ( { day, events, isCompact, hourRangeWhenNotFullDay } ) => {
   const [ isFullDay, toggleFullDay ] = useReducer( ( state ) => !state, false );
   if( isCompact && isFullDay )
      toggleFullDay( false );

   return (
      <StyledCalendarDay>
         <Day
            isFullDay={ isFullDay }
            hourRangeWhenNotFullDay={ hourRangeWhenNotFullDay }
            isCompact={ isCompact }
         >
            <DayInfo isCompact={ isCompact }>
               <DayName day={ day } isCompact={ isCompact }/>
               <AllDayButton isFullDay={ isFullDay } onClick={ toggleFullDay } isCompact={ isCompact }>
                  { isFullDay ? 'Hide' : 'Show' } full day
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
            <EventsGrid
               isFullDay={ isFullDay }
               hourRangeWhenNotFullDay={ hourRangeWhenNotFullDay }
               isCompact={ isCompact }
            >
               { events.map( ( event ) => (
                  <Event isCompact={ isCompact } key={ event.id } event={ event } />
               ) ) }
            </EventsGrid>
         </Day>
      </StyledCalendarDay>
   );
};

CalendarDay.propTypes = {
   day: PropTypes.string.isRequired,
   events: PropTypes.arrayOf( PropTypes.object ).isRequired,
   isCompact: PropTypes.bool,
   hourRangeWhenNotFullDay: PropTypes.arrayOf( PropTypes.number ).isRequired,
};
CalendarDay.defaultProps = {
   isCompact: false
};

export default CalendarDay;
