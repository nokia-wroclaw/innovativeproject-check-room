import React from 'react';
import PropTypes from 'prop-types';
import RoomMetadataDTO from '../../services/parsing/RoomMetadataDTO';
import { StyledRoomHeader, RoomTitle } from './RoomHeader_styles';
import RoomData from '../RoomData/RoomData';

const RoomHeader = ( { roomData } ) => {
   const room = RoomMetadataDTO.from( roomData.summary, roomData.description );

   return (
      <StyledRoomHeader>
         <RoomTitle>{ room.name }</RoomTitle>
         <RoomData room={ room } />
      </StyledRoomHeader>
   );
};

RoomHeader.propTypes = {
   roomData: PropTypes.shape( {
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   } ).isRequired,
};

export default RoomHeader;
