import React from 'react';
import PropTypes from 'prop-types';
import RoomListItem from './RoomListItem/RoomListItem';
import { StyledRoomList } from './RoomList_styles';

const RoomList = ( { roomsData } ) => {

   const rooms = roomsData.map( ( ( room )=> (
      <RoomListItem key={ room.id } roomData={ room } />
   ) ) );

   return (
      <StyledRoomList>
         { rooms.length < 1 ? <h1>No Calendars</h1> : (
            rooms
         ) }
      </StyledRoomList>
   );
};

RoomList.propTypes = {
   roomsData: PropTypes.arrayOf( PropTypes.object ),
};
RoomList.defaultProps = {
   roomsData: [],
};

export default RoomList;
