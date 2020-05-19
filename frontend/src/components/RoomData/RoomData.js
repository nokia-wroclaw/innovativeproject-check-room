import React from 'react';
import PropTypes from 'prop-types';
import ordinal from 'ordinal';
import { FaChalkboard, FaChair } from 'react-icons/fa';
import { GiFilmProjector } from 'react-icons/gi';
import RoomMetadataDTO from '../../services/parsing/RoomMetadataDTO';
import { StyledRoomData, RoomDescription, RoomLocation, RoomIndicators, Indicator, Bottom, Divider } from './RoomData_styles';

const RoomData = ( { room } ) => {
   const { description, location, hasProjector, hasWhiteboard, seatsNo } = room;

   return (
      <StyledRoomData>
         <RoomDescription>{ description || 'No description' }</RoomDescription>
         <Bottom>
            <Divider />
            <RoomLocation>
               { location ? `${location.building}, ${ordinal( location.floorNo )} floor` : 'Unknown location' }
            </RoomLocation>
            <RoomIndicators>
               <Indicator active={ hasWhiteboard }><abbr title="Whiteboard"><FaChalkboard /></abbr></Indicator>
               <Indicator active={ hasProjector }><abbr title="Projector"><GiFilmProjector /></abbr></Indicator>
               <Indicator active={ seatsNo }><abbr title="Seats"><FaChair /></abbr> { room.seatsNo }</Indicator>
            </RoomIndicators>
         </Bottom>
      </StyledRoomData>
   );
};

RoomData.propTypes = {
   room: PropTypes.instanceOf( RoomMetadataDTO ).isRequired,
};

export default RoomData;
