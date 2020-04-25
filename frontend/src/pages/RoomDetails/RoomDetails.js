import React, { useEffect, useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import EventList from '../../components/EventList/EventList';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import BackendContext from '../../services/communication/BackendContext';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const RoomDetails = () => {
   const [ room, setRoom ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const [ startDate, setStartDate ] = useState( '' );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();
   const fetchAPI = useContext( BackendContext );

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      setStartDate( startDateTmp );

      const [ promise, abort ] = fetchAPI( `calendar/${
         roomId.split( '@' )[0]
      }?startDate=${startDateTmp}`, 15 );
      promise.then( ( data ) => {
         setRoom( data );
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
               <RoomHeader roomData={ room.calendar } />
               <ToggleSwitch
                  toggleFunc={ toggleIsCompact }
                  value={ isCompact }
                  name="compact"
               />
               <EventList eventsData={ room.events } startDate={ startDate } isCompact={ isCompact } />
            </>
         ) }
      </>
   );
};

export default RoomDetails;
