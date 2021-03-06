import React, { useEffect, useState, useContext } from 'react';
import AdminRoomList from '../../components/AdminRoomList/AdminRoomList';
import BackendContext from '../../services/communication/BackendContext';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const AdminRooms = () => {
   const [ rooms, setRooms ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const backend = useContext( BackendContext );

   useEffect( () => {
      const [ promise, abort ] = backend.query.allRoomsMetadata();
      promise.then( ( roomList ) => {
         setRooms( roomList );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ backend ] );

   return isLoading ? <LoadingPage />
      : <AdminRoomList roomsData={ rooms } />;
};

export default AdminRooms;
