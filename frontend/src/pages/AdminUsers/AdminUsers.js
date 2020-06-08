import React, { useEffect, useState, useContext } from 'react';
import UserList from '../../components/UserList/UserList';
import BackendContext from '../../services/communication/BackendContext';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const AdminUsers = () => {
   const [ users, setUsers ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const backend = useContext( BackendContext );

   useEffect( () => {
      const [ promise, abort ] = backend.query.allUsers();
      promise.then( ( userList ) => {
         setUsers( userList );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ backend ] );

   return isLoading ? <LoadingPage />
      : <UserList usersData={ users } />;
};

export default AdminUsers;
