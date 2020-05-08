import React, { useEffect, useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import EventList from '../../components/EventList/EventList';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import BackendContext from '../../services/communication/BackendContext';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import QrCodeButton from '../../components/QrCodeButton/QrCodeButton';
import AddNewEventButton from '../../components/AddNewEventButton/AddNewEventButton';
import { FlexCenter } from './RoomDetails_styles';

const RoomDetails = () => {
   const [ room, setRoom ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const [ startDate, setStartDate ] = useState( '' );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();
   const backend = useContext( BackendContext );

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      setStartDate( startDateTmp );

      const [ promise, abort ] = backend.fetchCalendar( roomId, startDateTmp );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ roomId, backend ] );

   return (
      <>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <>
               <RoomHeader roomData={ room.calendar } />
               <FlexCenter style={ { display: 'flex' } }>
                  <QrCodeButton id={ roomId } />
                  <ToggleSwitch
                     toggleFunc={ toggleIsCompact }
                     value={ isCompact }
                     name="compact"
                  />
                  <AddNewEventButton id={ roomId } />
               </FlexCenter>
               <EventList eventsData={ room.events } startDate={ startDate } isCompact={ isCompact } />
            </>
         ) }
      </>
   );
};

export default RoomDetails;
