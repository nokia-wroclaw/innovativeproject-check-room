import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { StyledEventList, Hours } from './EventList_styles';
import CalendarDay from './CalendarDay/CalendarDay';
import { GridlineHour } from './CalendarDay/CalendarDay_styles';

const EventList = ( { eventsData, startDate, isCompact } ) => {
   const groupedEvents = _.groupBy( eventsData, ( event ) =>
      moment( event.start.dateTime ).format( 'YYYY-MM-DD' )
   );
   const hourRangeWhenNotFullDay = [ 7, 18 ];
   const week = _.times( 7, ( i ) => {
      const day = moment( startDate )
         .add( i, 'days' )
         .format( 'YYYY-MM-DD' );

      return (
         <CalendarDay
            key={ day }
            day={ day }
            events={ groupedEvents[day] ?? [] }
            isCompact={ isCompact }
            hourRangeWhenNotFullDay={ hourRangeWhenNotFullDay }
         />
      );
   } );

   return (
      <StyledEventList isCompact={ isCompact }>
         { isCompact && <Hours hourRangeWhenNotFullDay={ hourRangeWhenNotFullDay }>
            { _.times( 24, ( i ) => (
               <GridlineHour
                  key={ i }
                  style={ {
                     gridRow: `${i * 4 + 2} / ${i * 4 + 4}`,
                  } }
               >
                  { i }
               </GridlineHour>
            ) ) }
         </Hours> }
         { week }
      </StyledEventList>
   );
};

EventList.propTypes = {
   eventsData: PropTypes.arrayOf( PropTypes.object ),
   startDate: PropTypes.string,
   isCompact: PropTypes.bool,
};
EventList.defaultProps = {
   eventsData: [],
   startDate: '',
   isCompact: false,
};

export default EventList;
