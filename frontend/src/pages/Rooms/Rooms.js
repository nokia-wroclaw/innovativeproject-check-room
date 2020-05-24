import React, { useEffect, useState, useContext } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import BackendContext from '../../services/communication/BackendContext';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const Rooms = () => {
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
      : <RoomList roomsData={ rooms } />;
};

export default Rooms;
