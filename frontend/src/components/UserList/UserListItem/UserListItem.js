import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Select, Button } from 'antd';
import { StyledUserListItem, UserInfo, UserType, UserActions } from './UserListItem_styles';
import { FullWidthSelect } from '../../StyledFormComponents/StyledFormComponents';
import BackendContext from '../../../services/communication/BackendContext';

const UserList = ( { user } ) => {
   const [ isSaving, setIsSaving ] = useState( false );
   const [ isDeleted, setIsDeleted ] = useState( false );
   const backend = useContext( BackendContext );
   const type = user.type || 'guest';
   const ourselves = backend.auth.id === user._id;

   const changeType = ( value ) => {
      setIsSaving( true );
      const [ promise, ] = backend.command.editUser( user._id, value );
      promise.then( () => {
         setIsSaving( false );
      } );
   };

   const deleteUser = () => {
      setIsSaving( true );
      const [ promise, ] = backend.command.deleteUser( user._id );
      promise.then( () => {
         setIsSaving( false );
         setIsDeleted( true );
      } );
   };

   if ( isDeleted ) return null;

   return (
      <StyledUserListItem>
         <UserInfo>{ user.name } ({ user.email })</UserInfo>
         <UserType>
            <FullWidthSelect
               defaultValue={ type }
               disabled={ ourselves || isSaving }
               loading={ isSaving }
               onChange={ changeType }
            >
               <Select.Option value="admin">admin</Select.Option>
               <Select.Option value="user">user</Select.Option>
               <Select.Option value="guest">guest</Select.Option>
            </FullWidthSelect>
         </UserType>
         <UserActions>
            <Button
               disabled={ ourselves || isSaving }
               loading={ isSaving }
               danger
               onClick={ deleteUser }
            >Delete</Button>
         </UserActions>
      </StyledUserListItem>
   );
};

UserList.propTypes = {
   user: PropTypes.shape( {
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string,
   } ).isRequired,
};

export default UserList;
