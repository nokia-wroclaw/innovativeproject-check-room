import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RoomListItem from './RoomListItem/RoomListItem';
import RoomFilterOptions from './RoomFilterOptions/RoomFilterOptions';
import RoomFilter from '../../services/logic/RoomFilter';
import { StyledRoomList, FilteredRoomList } from './RoomList_styles';

const RoomList = ( { roomsData } ) => {

   const [ filters, setFilters ] = useState( {} );

   const rooms = useMemo( () => {
      const filter = new RoomFilter( filters ).asFunction();

      return roomsData
         .filter( filter )
         .map( ( ( room ) => (
            <RoomListItem key={ room.id } roomData={ room } />
         ) ) );
   }, [ filters, roomsData ] );

   return (
      <StyledRoomList>
         <RoomFilterOptions state={ [ filters, setFilters ] } />
         <FilteredRoomList>
            { rooms.length < 1 ? <h1>No Calendars</h1> : (
               rooms
            ) }
         </FilteredRoomList>
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
