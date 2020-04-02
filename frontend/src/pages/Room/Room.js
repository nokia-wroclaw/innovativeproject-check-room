import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { constants } from '../../assets/configs/constants';
import EventList from '../../components/EventList/EventList';
import RoomData from '../../components/RoomData/RoomData';

const Room = () => {
   const [ calendar, setCalendar ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const { roomId } = useParams();
   const startDate = new Date().toISOString();

   useEffect( () => {
      const controller = new AbortController();
      const { signal } = controller;
      fetch(
         `${constants.url.API_URL}calendar/${
            roomId.split( '@' )[0]
         }?startDate=${startDate}`,
         {
            signal,
         }
      )
         .then( ( response ) => response.json() )
         .then( ( data ) => {
            setCalendar( data );
            setIsLoading( false );
         } )
         // eslint-disable-next-line no-console
         .catch( ( error ) => console.log( error ) );

      return () => {
         controller.abort();
      };
   }, [ roomId, startDate ] );

   return (
      <>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <>
               <RoomData roomData={ calendar.calendar } />
               <EventList eventsData={ calendar.events } startDate={ startDate } />
            </>
         ) }
      </>
   );
};

export default Room;
