import React from 'react';
import PropTypes from 'prop-types';
import AdminRoomListItem from './AdminRoomListItem/AdminRoomListItem';
import { StyledAdminRoomList } from './AdminRoomList_styles';

const AdminRoomList = ( { roomsData } ) => {
   return (
      <StyledAdminRoomList>
         { roomsData.map( ( room ) => ( <AdminRoomListItem key={ room.id } room={ room } /> ) ) }
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
