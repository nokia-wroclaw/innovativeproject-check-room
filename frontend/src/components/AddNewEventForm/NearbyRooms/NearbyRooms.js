import React from 'react';
import PropTypes from 'prop-types';
import NearbyRoom from './NearbyRoom/NearbyRoom';
import { StyledNearbyRooms } from './NearbyRooms_styles';

const NearbyRooms = ( { nearbyRooms } ) => {
   console.log( nearbyRooms );

   return (
      <StyledNearbyRooms>
         { nearbyRooms.map( ( nearbyRoom ) => (
            <NearbyRoom key={ nearbyRoom.id } roomData={ nearbyRoom } />
         ) ) }
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
