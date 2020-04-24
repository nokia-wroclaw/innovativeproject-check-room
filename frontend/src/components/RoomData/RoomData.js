import React from 'react';
import PropTypes from 'prop-types';
import ordinal from 'ordinal';
import { FaChalkboard, FaChair } from 'react-icons/fa';
import { GiFilmProjector } from 'react-icons/gi';
import { StyledRoomData, RoomDescription, RoomLocation, RoomIndicators, Indicator } from './RoomData_styles';

const RoomData = ( { room } ) => {
   const { description, location, hasProjector, hasWhiteboard, seatsNo } = room;

   return (
      <StyledRoomData>
         <RoomDescription>{ description }</RoomDescription>
         <RoomLocation>{ location ? <>{ location.building }, { ordinal( location.floorNo ) } floor</> : '' }</RoomLocation>
         <RoomIndicators>
            <Indicator active={ hasWhiteboard }><FaChalkboard /></Indicator>
            <Indicator active={ hasProjector }><GiFilmProjector /></Indicator>
            <Indicator active={ seatsNo }><FaChair /> { room.seatsNo }</Indicator>
         </RoomIndicators>
      </StyledRoomData>
   );
};

RoomData.propTypes = {
   room: PropTypes.shape().isRequired,
};

export default RoomData;
