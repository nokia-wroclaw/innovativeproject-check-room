import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem/UserListItem';
import { StyledUserList } from './UserList_styles';

const UserList = ( { usersData } ) => {
   return (
      <StyledUserList>
         { usersData.map( ( user ) => ( <UserListItem key={ user._id } user={ user } /> ) ) }
      </StyledUserList>
   );
};

UserList.propTypes = {
   usersData: PropTypes.arrayOf( PropTypes.object ),
};
UserList.defaultProps = {
   usersData: [],
};

export default UserList;
