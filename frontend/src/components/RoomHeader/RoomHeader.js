import React from 'react';
import PropTypes from 'prop-types';
import JsonParser from '../../services/parsing/JsonParser';
import { StyledRoomHeader, RoomTitle } from './RoomHeader_styles';
import RoomData from '../RoomData/RoomData';

const RoomHeader = ( { roomData } ) => {
   const defaultRoomData = {
      name: roomData.summary,
      description: roomData.description
   };
   const room = JsonParser.parse( roomData.description, defaultRoomData );

   return (
      <StyledRoomHeader>
         <RoomTitle>{ room.name }</RoomTitle>
         <RoomData room={ room } />
      </StyledRoomHeader>
   );
};

RoomHeader.propTypes = {
   roomData: PropTypes.string.isRequired,
};

export default RoomHeader;
