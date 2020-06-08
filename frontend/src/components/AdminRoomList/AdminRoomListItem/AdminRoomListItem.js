import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
   StyledAdminRoomListItem,
   UserInfo,
   UserActions,
} from './AdminRoomListItem_styles';
import BackendContext from '../../../services/communication/BackendContext';

const AdminRoomListItem = ( { room } ) => {
   const [ isSaving, setIsSaving ] = useState( false );
   const [ isDeleted, setIsDeleted ] = useState( false );
   const backend = useContext( BackendContext );

   const deleteRoom = () => {
      setIsSaving( true );
      const [ promise ] = backend.command.deleteCalendar( room.id );
      promise.then( () => {
         setIsSaving( false );
         setIsDeleted( true );
      } );
   };

   if ( isDeleted ) return null;

   return (
      <StyledAdminRoomListItem>
         <UserInfo>{ room.summary }</UserInfo>
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
