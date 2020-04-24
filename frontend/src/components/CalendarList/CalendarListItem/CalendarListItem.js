import React from 'react';
import PropTypes from 'prop-types';
import JsonParser from '../../../services/parsing/JsonParser';
import RoomData from '../../RoomData/RoomData';
import { StyledCalendarListItem, CalendarHeader, CalendarLink, CalendarDescription } from './CalendarListItem_styles';

const CalendarListItem = ( { calendarData } ) => {
   const { description, summary, id } = calendarData;
   const defaultRoomData = {
      name: summary,
      description,
   };
   const room = JsonParser.parse( description, defaultRoomData );

   return (
      <StyledCalendarListItem>
         <CalendarLink to={ `/room/${id.split( '@' )[0]}` }>

            <CalendarHeader>{ room.name }</CalendarHeader>
            <CalendarDescription >
               <RoomData room={ room } />
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
