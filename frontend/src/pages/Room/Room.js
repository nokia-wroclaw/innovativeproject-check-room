import React, { useEffect, useState, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { constants } from '../../assets/configs/constants';
import EventList from '../../components/EventList/EventList';
import RoomData from '../../components/RoomData/RoomData';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const Room = () => {
   const [ calendar, setCalendar ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const [ startDate, setStartDate ] = useState( '' );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      setStartDate( startDateTmp );
      const controller = new AbortController();
      const { signal } = controller;

      fetch(
         `${constants.url.API_URL}calendar/${
            roomId.split( '@' )[0]
         }?startDate=${startDateTmp}`,
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
   }, [ roomId ] );

   return (
      <>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <>
               <RoomData roomData={ calendar.calendar } />
               <ToggleSwitch
                  toggleFunc={ toggleIsCompact }
                  value={ isCompact }
                  name="compact"
               />
               <EventList eventsData={ calendar.events } startDate={ startDate } isCompact={ isCompact } />
            </>
         ) }
      </>
   );
};

export default Room;
