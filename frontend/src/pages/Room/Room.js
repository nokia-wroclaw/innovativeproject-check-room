import React, { useEffect, useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import EventList from '../../components/EventList/EventList';
import RoomData from '../../components/RoomData/RoomData';
import FetchContext from '../../services/fetching/FetchContext';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const Room = () => {
   const [ calendar, setCalendar ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const [ startDate, setStartDate ] = useState( '' );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();
   const fetchAPI = useContext( FetchContext );

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      setStartDate( startDateTmp );

      const [ promise, abort ] = fetchAPI( `calendar/${
         roomId.split( '@' )[0]
      }?startDate=${startDateTmp}` );
      promise.then( ( data ) => {
         setCalendar( data );
         setIsLoading( false );
      } );

      return abort;
   }, [ roomId, fetchAPI ] );

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
