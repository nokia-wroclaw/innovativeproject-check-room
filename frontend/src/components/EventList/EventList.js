import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { StyledEventList } from './EventList_styles';
import CalendarDay from './CalendarDay/CalendarDay';

const EventList = ( { eventsData, startDate } ) => {
   const groupedEvents = _.groupBy( eventsData, ( event ) =>
      moment( event.start.dateTime ).format( 'YYYY-MM-DD' )
   );
   const week = _.times( 7, ( i ) => {
      const day = moment( startDate )
         .add( i, 'days' )
         .format( 'YYYY-MM-DD' );

      return (
         <CalendarDay key={ day } day={ day } events={ groupedEvents[day] ?? [] } />
      );
   } );

   return <StyledEventList>{ week }</StyledEventList>;
};

EventList.propTypes = {
   eventsData: PropTypes.arrayOf( PropTypes.object ),
   startDate: PropTypes.string,
};
EventList.defaultProps = {
   eventsData: [],
   startDate: '',
};

export default EventList;
