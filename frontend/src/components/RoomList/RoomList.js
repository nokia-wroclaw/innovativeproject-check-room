import React from 'react';
import PropTypes from 'prop-types';
import RoomListItem from './RoomListItem/RoomListItem';
import { StyledRoomList } from './RoomList_styles';

const RoomList = ( { calendarsData } ) => {

   const calendars = calendarsData.map( ( ( calendar )=> (
      <RoomListItem key={ calendar.id } calendarData={ calendar } />
   ) ) );

   return (
      <StyledRoomList>
         { calendarsData.length < 1 ? <h1>No Calendars</h1> : (
            calendars
         ) }
      </StyledRoomList>
   );
};

RoomList.propTypes = {
   calendarsData: PropTypes.arrayOf( PropTypes.object ),
};
RoomList.defaultProps = {
   calendarsData: [],
};

export default RoomList;
