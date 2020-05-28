import React from 'react';
import PropTypes from 'prop-types';
import RoomListItem from '../../../RoomList/RoomListItem/RoomListItem';

const NearbyRoom = ( { roomData } ) => {
   return (
      <RoomListItem roomData={ roomData } />
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
