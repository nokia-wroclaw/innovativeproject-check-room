import React from 'react';
import PropTypes from 'prop-types';
import ordinal from 'ordinal';
import { FaChalkboard, FaChair } from 'react-icons/fa';
import { GiFilmProjector } from 'react-icons/gi';
import RoomMetadataDTO from '../../services/parsing/RoomMetadataDTO';
import { StyledRoomData, RoomDescription, RoomLocation, RoomIndicators, Indicator } from './RoomData_styles';

const RoomData = ( { room } ) => {
   const { description, location, hasProjector, hasWhiteboard, seatsNo } = room;

   return (
      <StyledRoomData>
         { description ? <RoomDescription>{ description }</RoomDescription> : null }
         { location ? <RoomLocation>{ location.building }, { ordinal( location.floorNo ) } floor</RoomLocation> : null }
         <RoomIndicators>
            <Indicator active={ hasWhiteboard }><abbr title="Whiteboard"><FaChalkboard /></abbr></Indicator>
            <Indicator active={ hasProjector }><abbr title="Projector"><GiFilmProjector /></abbr></Indicator>
            <Indicator active={ seatsNo }><abbr title="Seats"><FaChair /></abbr> { room.seatsNo }</Indicator>
         </RoomIndicators>
      </StyledRoomData>
   );
};

RoomData.propTypes = {
   room: PropTypes.instanceOf( RoomMetadataDTO ).isRequired,
};

export default RoomData;
