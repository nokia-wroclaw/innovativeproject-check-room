import React, { useEffect, useState, useContext } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import FetchContext from '../../services/fetching/FetchContext';

const Rooms = () => {
   const [ calendars, setCalendars ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const fetchAPI = useContext( FetchContext );

   useEffect( () => {
      const [ promise, abort ] = fetchAPI( 'calendars' );
      promise.then( ( data ) => {
         const roomList = data.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         );
         setCalendars( roomList );
         setIsLoading( false );
      } );

      return abort;
   }, [ fetchAPI ] );

   return (
      <>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <RoomList calendarsData={ calendars } />
         ) }
      </>
   );
};

export default Rooms;
