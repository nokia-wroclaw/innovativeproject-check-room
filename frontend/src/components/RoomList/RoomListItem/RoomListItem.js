import React from 'react';
import PropTypes from 'prop-types';
import RoomMetadataDTO from '../../../services/parsing/RoomMetadataDTO';
import RoomData from '../../RoomData/RoomData';
import { StyledRoomListItem, RoomHeader, RoomLink, RoomDescription } from './RoomListItem_styles';

const RoomListItem = ( { roomData } ) => {
   const room = RoomMetadataDTO.from( roomData );

   return (
      <StyledRoomListItem>
         <RoomLink to={ `/room/${room.id}` }>
            <RoomHeader>{ room.name }</RoomHeader>
            <RoomDescription>
               <RoomData room={ room } />
            </RoomDescription>
         </RoomLink>
      </StyledRoomListItem>
   );
};

RoomListItem.propTypes = {
   roomData: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
   } ).isRequired,
};

export default RoomListItem;
