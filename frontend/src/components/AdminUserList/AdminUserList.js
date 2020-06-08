import React from 'react';
import PropTypes from 'prop-types';
import AdminUserListItem from './AdminUserListItem/AdminUserListItem';
import { StyledAdminUserList } from './AdminUserList_styles';

const AdminUserList = ( { usersData } ) => {
   return (
      <StyledAdminUserList>
         { usersData.map( ( user ) => ( <AdminUserListItem key={ user._id } user={ user } /> ) ) }
      </StyledAdminUserList>
   );
};

AdminUserList.propTypes = {
   usersData: PropTypes.arrayOf( PropTypes.object ),
};
AdminUserList.defaultProps = {
   usersData: [],
};

export default AdminUserList;
