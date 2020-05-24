import React from 'react';
import PropTypes from 'prop-types';
import { StyledUserListItem } from './UserListItem_styles';

const UserList = ( { user } ) => {
   return (
      <StyledUserListItem>
         { user.name } ({ user.email })
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
