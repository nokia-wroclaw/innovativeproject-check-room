import React, { useEffect, useState, useContext } from 'react';
import AdminUserList from '../../components/AdminUserList/AdminUserList';
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
      : <AdminUserList usersData={ users } />;
};

export default AdminUsers;
