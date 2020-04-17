import React, { useEffect, useState, useContext } from 'react';
import CalendarList from '../../components/CalendarList/CalendarList';
import FetchContext from '../../services/fetching/FetchContext';

const Calendars = () => {
   const [ calendars, setCalendars ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const fetchAPI = useContext( FetchContext );

   useEffect( () => {
      const [ promise, abort ] = fetchAPI( 'calendars' );
      promise.then( ( data ) => {
         const calendarList = data.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         );
         setCalendars( calendarList );
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
            <CalendarList calendarsData={ calendars } />
         ) }
      </>
   );
};

export default Calendars;
