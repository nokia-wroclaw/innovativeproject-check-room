import React from 'react';
import PropTypes from 'prop-types';
import NearbyRoom from './NearbyRoom/NearbyRoom';
import { StyledNearbyRooms, NearbyRoomsList } from './NearbyRooms_styles';

const NearbyRooms = ( { nearbyRooms } ) => {
   return (
      <StyledNearbyRooms>
         <h2>Room is already reserved :/ </h2>
         <p> But we have { nearbyRooms.length } empty rooms for that period.</p>
         <NearbyRoomsList>
            { nearbyRooms.map( ( nearbyRoom ) => (
               <NearbyRoom key={ nearbyRoom.id } roomData={ nearbyRoom } />
            ) ) }
         </NearbyRoomsList>
      </StyledNearbyRooms>
   );
};

NearbyRooms.propTypes = {
   nearbyRooms: PropTypes.arrayOf(
      PropTypes.shape( {
         id: PropTypes.string.isRequired,
         summary: PropTypes.string.isRequired,
         description: PropTypes.string,
      } ).isRequired
   ).isRequired,
};

export default NearbyRooms;
