import React from 'react';
import PropTypes from 'prop-types';
import { StyledRoomData, RoomTitle, RoomDescription } from './RoomData_styles';

const RoomData = ( { roomData, roomData: { summary, description } } ) => {
   console.log( roomData );

   return (
      <StyledRoomData> 
         <RoomTitle>
            { summary }
         </RoomTitle>
         <RoomDescription>
            { description }
         </RoomDescription>
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
