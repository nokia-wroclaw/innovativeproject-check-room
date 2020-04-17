import React, { useState, useContext, useEffect } from 'react';
import FetchContext from '../../services/fetching/FetchContext';
import Greeter from '../../components/Greeter/Greeter';

const Index = () => {
   const [ amountOfRooms, setAmountOfRooms ] = useState( '(loading...)' );
   const fetchAPI = useContext( FetchContext );

   useEffect( () => {
      const [ promise, abort ] = fetchAPI( 'calendars' );
      promise.then( ( data ) => {
         const calendarList = data.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         );
         setAmountOfRooms( calendarList.length );
      } );

      return abort;
   }, [ fetchAPI ] );

   return (
      <Greeter amountOfRooms={ amountOfRooms } />
   );
};

export default Index;
