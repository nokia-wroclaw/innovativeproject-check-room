import React, { useEffect, useState } from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import CalendarList from '../../components/CalendarList/CalendarList';
import { constants } from '../../assets/configs/constants';

const Calendars = () => {
   const [ calendars, setCalendars ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   useEffect( () => {
      const controller = new AbortController();
      const { signal } = controller;
      
      fetch( `${constants.url.API_URL}calendars`,{ signal } )
         .then( ( response ) => response.json() )
         .then( ( data ) => {
            const calendarList = data.filter(
               ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_',
            );
            setCalendars( calendarList );
            setIsLoading( false );
         } );

      return () => {
         controller.abort();
      };
   }, [] );

   return (
      <PageTemplate>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
             Loading
            </h1>
         ) : (
            <CalendarList calendarsData={ calendars } />
         ) }
      </PageTemplate>
   );
};

export default Calendars;
