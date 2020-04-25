import React, { useEffect, useState, useContext } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import BackendContext from '../../services/communication/BackendContext';

const Rooms = () => {
   const [ rooms, setRooms ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const backend = useContext( BackendContext );

   useEffect( () => {
      const [ promise, abort ] = backend.listRooms();
      promise.then( ( roomList ) => {
         setRooms( roomList );
         setIsLoading( false );
      } );

      return abort;
   }, [ backend ] );

   return (
      <>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <RoomList roomsData={ rooms } />
         ) }
      </>
   );
};

export default Rooms;
