import React, { useEffect, useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Drawer } from 'antd';
import EventList from '../../components/EventList/EventList';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import BackendContext from '../../services/communication/BackendContext';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import QrCodeButton from '../../components/QrCodeButton/QrCodeButton';
import AddNewEventButton from '../../components/AddNewEventButton/AddNewEventButton';
import AddNewEventToRoom from '../AddNewEventToRoom/AddNewEventToRoom';
import { FlexCenter } from './RoomDetails_styles';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const RoomDetails = () => {
   const [ room, setRoom ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();
   const backend = useContext( BackendContext );

   const startDate = moment()
      .startOf( 'day' )
      .toISOString();

   const updateCalendar = () => {
      const [ promise, abort ] = backend.query.roomMetadataAndEvents( roomId, startDate );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   };

   useEffect( updateCalendar, [ roomId, backend ] );

   const [ drawerOpen, setDrawerOpen ] = useState( false );
   const openDrawer = () => setDrawerOpen( true );
   const closeDrawer = () => setDrawerOpen( false );

   const canAdd = backend.auth.can( 'add event' );

   return isLoading ? <LoadingPage /> :
      <>
         <RoomHeader roomData={ room.calendar } />
         <FlexCenter style={ { display: 'flex' } }>
            <QrCodeButton id={ roomId } />
            <ToggleSwitch
               toggleFunc={ toggleIsCompact }
               value={ isCompact }
               name="compact"
            />
            { canAdd ? <AddNewEventButton openDrawer={ openDrawer } /> : null }
         </FlexCenter>

         <EventList eventsData={ room.events } startDate={ startDate } isCompact={ isCompact } />

         <Drawer
            title="Add an event"
            width="min(600px, 90%)"
            onClose={ closeDrawer }
            visible={ drawerOpen }
            bodyStyle={ { paddingBottom: 80 } }>
            <AddNewEventToRoom room={ room.calendar } onSubmit={ () => {
               closeDrawer();
               updateCalendar();
            } }/>
         </Drawer>
      </>;
};

export default RoomDetails;
