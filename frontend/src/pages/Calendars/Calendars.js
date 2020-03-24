import React, { useEffect, useState } from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import CalendarList from '../../components/CalendarList/CalendarList';
import { constants } from '../../assets/configs/constants';

const Calendars = () => {
   const [ calendars, setCalendars ] = useState( [] );
   useEffect( () => {
      fetch( `${constants.url.API_URL}calendars` )
         .then( ( response ) => {
            return response.json();
         } )
         .then( ( data ) => {
            const calendarList = data.filter(
               ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
            );
            setCalendars( calendarList );
         } );

      return () => {};
   }, [] );

   return (
      <PageTemplate>
         <CalendarList calendarsData={ calendars } />
      </PageTemplate>
   );
};

export default Calendars;
