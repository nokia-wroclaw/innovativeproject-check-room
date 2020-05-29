import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserList from '../../components/UserList/UserList';
import BackendContext from '../../services/communication/BackendContext';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const Users = () => {
   const [ users, setUsers ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const backend = useContext( BackendContext );
   const history = useHistory();

   useEffect( () => {
      if ( !backend.auth.can( 'manage users' ) ) {
         setUsers( [] );
         setIsLoading( false );
         history.push( '/' );

         return undefined;
      }

      const [ promise, abort ] = backend.query.allUsers();
      promise.then( ( userList ) => {
         setUsers( userList );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ backend, backend.auth.user, history ] );

   return isLoading ? <LoadingPage />
      : <UserList usersData={ users } />;
};

export default Users;
