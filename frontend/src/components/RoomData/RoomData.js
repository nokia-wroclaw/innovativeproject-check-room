import React from 'react';
import PropTypes from 'prop-types';
import { FaChalkboard, FaChair } from 'react-icons/fa';
import { GiFilmProjector } from 'react-icons/gi';
import JsonParser from '../../services/parsing/JsonParser';
import { StyledRoomData, RoomTitle, RoomDescription, RoomLocation, RoomIndicators, Indicator } from './RoomData_styles';

const RoomData = ( { roomData } ) => {
   const defaultRoomData = {
      name: roomData.summary,
      description: roomData.description
   };
   const room = JsonParser.parse( roomData.description, defaultRoomData );
   const { name, description, location, hasProjector, hasWhiteboard, seatsNo } = room;

   return (
      <StyledRoomData>
         <RoomTitle>{ name }</RoomTitle>
         <RoomDescription>{ description }</RoomDescription>
         <RoomLocation>{ location ? <>{ location.building }, { location.floorNo } floor</> : '' }</RoomLocation>
         <RoomIndicators>
            <Indicator active={ hasWhiteboard }><FaChalkboard /></Indicator>
            <Indicator active={ hasProjector }><GiFilmProjector /></Indicator>
            <Indicator active={ seatsNo }><FaChair /> { room.seatsNo }</Indicator>
         </RoomIndicators>
      </StyledRoomData>
   );
};

RoomData.propTypes = {
   roomData: PropTypes.shape( {
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   } ).isRequired,
};

export default RoomData;
