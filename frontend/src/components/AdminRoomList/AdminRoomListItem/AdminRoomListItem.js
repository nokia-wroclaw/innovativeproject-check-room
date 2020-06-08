import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
   StyledAdminRoomListItem,
   UserInfo,
   UserActions,
} from './AdminRoomListItem_styles';
import BackendContext from '../../../services/communication/BackendContext';
import RoomMetadataDTO from '../../../services/parsing/RoomMetadataDTO';

const AdminRoomListItem = ( { room } ) => {
   const [ isSaving, setIsSaving ] = useState( false );
   const [ isDeleted, setIsDeleted ] = useState( false );
   const backend = useContext( BackendContext );
   const metadata = RoomMetadataDTO.from( room );

   const deleteRoom = () => {
      setIsSaving( true );
      const [ promise ] = backend.command.deleteCalendar( room.id );
      promise.then( () => {
         setIsSaving( false );
         setIsDeleted( true );
         backend.cache.reset();
      } );
   };

   if ( isDeleted ) return null;

   return (
      <StyledAdminRoomListItem>
         <UserInfo>{ metadata.name } ({ room.summary })</UserInfo>
         <UserActions>
            <Button
               disabled={ isSaving }
               loading={ isSaving }
               danger
               onClick={ deleteRoom }
            >
               Delete
            </Button>
         </UserActions>
      </StyledAdminRoomListItem>
   );
};

AdminRoomListItem.propTypes = {
   room: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   } ).isRequired,
};

export default AdminRoomListItem;
