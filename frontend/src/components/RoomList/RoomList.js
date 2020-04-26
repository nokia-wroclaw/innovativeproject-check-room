import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RoomListItem from './RoomListItem/RoomListItem';
import RoomFilterOptions from './RoomFilterOptions/RoomFilterOptions';
import RoomMetadataDTO from '../../services/parsing/RoomMetadataDTO';
import { StyledRoomList, FilteredRoomList } from './RoomList_styles';

const RoomList = ( { roomsData } ) => {

   const [ filters, setFilters ] = useState( {} );

   const rooms = useMemo( () => {
      return roomsData
         .map( ( room ) => ( { room, metadata: RoomMetadataDTO.from( room.summary, room.description ) } ) )
         .filter( ( { metadata } ) => filters.hasProjector ?
            metadata.hasProjector : true )
         .filter( ( { metadata } ) => filters.hasWhiteboard ?
            metadata.hasWhiteboard : true )
         .filter( ( { metadata } ) => filters.seatsNo ?
            metadata.seatsNo >= filters.seatsNo : true )
         .filter( ( { metadata } ) => filters.name ?
            metadata.name.toLowerCase().includes( filters.name.toLowerCase() ) : true )
         .map( ( ( { room } ) => (
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
