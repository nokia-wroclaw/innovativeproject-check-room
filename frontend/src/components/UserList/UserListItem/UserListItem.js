import React from 'react';
import PropTypes from 'prop-types';
import { StyledUserListItem, UserInfo, UserType, UserActions } from './UserListItem_styles';

const UserList = ( { user } ) => {
   return (
      <StyledUserListItem>
         <UserInfo>{ user.name } ({ user.email })</UserInfo>
         <UserType>{ user.type || 'guest' }</UserType>
         <UserActions>btn</UserActions>
      </StyledUserListItem>
   );
};

UserList.propTypes = {
   user: PropTypes.shape( {
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string,
   } ).isRequired,
};

export default UserList;
