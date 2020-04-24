import React from 'react';
import PropTypes from 'prop-types';
import RoomMetadataDTO from '../../../services/parsing/RoomMetadataDTO';
import RoomData from '../../RoomData/RoomData';
import { StyledRoomListItem, CalendarHeader, CalendarLink, CalendarDescription } from './RoomListItem_styles';

const RoomListItem = ( { calendarData } ) => {
   const { description, summary, id } = calendarData;
   const room = RoomMetadataDTO.from( summary, description );

   return (
      <StyledRoomListItem>
         <CalendarLink to={ `/room/${id.split( '@' )[0]}` }>

            <CalendarHeader>{ room.name }</CalendarHeader>
            <CalendarDescription >
               <RoomData room={ room } />
            </CalendarDescription>
         </CalendarLink>
      </StyledRoomListItem>
   );
};

RoomListItem.propTypes = {
   calendarData: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string,
   } ).isRequired,
};

export default RoomListItem;
