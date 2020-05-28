import React from 'react';
import PropTypes from 'prop-types';
import RoomMetadataDTO from '../../../../services/parsing/RoomMetadataDTO';
import RoomData from '../../../RoomData/RoomData';
import { NearbyRoomLink } from './NearbyRoom_styles';
import { RoomTitle } from '../../../RoomHeader/RoomHeader_styles';

const NearbyRoom = ( { roomData } ) => {
   const room = RoomMetadataDTO.from( roomData );

   return (
      <NearbyRoomLink to={ `/room/${room.id}` }>
         <RoomTitle>{ room.name }</RoomTitle>
         <RoomData room={ room } />
      </NearbyRoomLink>
   );
};

NearbyRoom.propTypes = {
   roomData: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
   } ).isRequired,
};

export default NearbyRoom;
