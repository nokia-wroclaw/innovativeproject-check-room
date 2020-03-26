import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { constants } from '../../assets/configs/constants';
import EventList from '../../components/EventList/EventList';

const Room = () => {
   const [ calendar, setCalendar ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const { roomId } = useParams();
   useEffect( () => {
      const controller = new AbortController();
      const { signal } = controller;

      fetch( `${constants.url.API_URL}calendar/${roomId.split( '@' )[0]}`, { signal } )
         .then( ( response ) => response.json() )
         .then( ( data ) => {
            setCalendar( data );
            setIsLoading( false );
         } );

      return () => {
         controller.abort();
      };
   }, [ roomId ] );

   return (
      <PageTemplate>
         {
            isLoading ? <h1>Loading</h1> : <> 
               <EventList eventsData={ calendar.events } />
            </>
         }
      </PageTemplate>
   );
};

export default Room;
