import React from 'react';
import PropTypes from 'prop-types';
import NearbyRoom from './NearbyRoom/NearbyRoom';
import { StyledNearbyRooms, NearbyRoomsList } from './NearbyRooms_styles';
import RoomMetadataDTO from '../../../services/parsing/RoomMetadataDTO';

const NearbyRooms = ( { freeRooms, thisRoomData } ) => {
   const thisRoom = RoomMetadataDTO.from( thisRoomData );
   const nearbyRooms = freeRooms
      .map( ( roomData ) => RoomMetadataDTO.from( roomData ) )
      .filter(
         ( room ) =>
            room.id !== thisRoom.id && // this shouldn't happen
            room.location &&
            thisRoom.location &&
            thisRoom.location.building === room.location.building
      );

   return (
      <StyledNearbyRooms>
         <h2>Room is already reserved :/ </h2>
         <p>
            But we have { nearbyRooms.length } empty rooms nearby for that period.
         </p>
         <NearbyRoomsList>
            { nearbyRooms.map( ( nearbyRoom ) => (
               <NearbyRoom key={ nearbyRoom.id } roomData={ nearbyRoom } />
            ) ) }
         </NearbyRoomsList>
      </StyledNearbyRooms>
   );
};

NearbyRooms.propTypes = {
   freeRooms: PropTypes.arrayOf(
      PropTypes.shape( {
         id: PropTypes.string.isRequired,
         summary: PropTypes.string.isRequired,
         description: PropTypes.string,
      } ).isRequired
   ).isRequired,
   thisRoomData: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
   } ).isRequired,
};

export default NearbyRooms;
