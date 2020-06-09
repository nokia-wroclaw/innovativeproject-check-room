import React, { useContext } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { CenteredButton } from '../StyledFormComponents/StyledFormComponents';
import AdminRoomListItem from './AdminRoomListItem/AdminRoomListItem';
import { StyledAdminRoomList } from './AdminRoomList_styles';
import showRoomCreationModal from './RoomCreationModal/RoomCreationModal';
import BackendContext from '../../services/communication/BackendContext';

const AdminRoomList = ( { roomsData } ) => {
   const backend = useContext( BackendContext );
   const history = useHistory();

   const createRoom = ( newMetadata ) => {
      // FIXME: random string would have been a better choice.
      const id = _.random( 100, 999999999 );
      const summary = `ROOM_${id}`;
      const [ promise ] = backend.command.addCalendar( summary, newMetadata );
      message.info( 'Room is being created. This may take up to 30 seconds...' );
      promise.then( () => {
         backend.cache.reset();
         // FIXME: use a method to reload the room list.
         history.push( '/' );
      } );
   };

   return (
      <StyledAdminRoomList>
         { roomsData.map( ( room ) => ( <AdminRoomListItem key={ room.id } room={ room } /> ) ) }
         <CenteredButton
            type="primary"
            style={ { marginTop: 10 } }
            onClick={ () => showRoomCreationModal( createRoom ) }
         >
            Add new room
         </CenteredButton>
      </StyledAdminRoomList>
   );
};

AdminRoomList.propTypes = {
   roomsData: PropTypes.arrayOf( PropTypes.object ),
};
AdminRoomList.defaultProps = {
   roomsData: [],
};

export default AdminRoomList;
