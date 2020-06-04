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
import AddNewEventForm from '../../components/AddNewEventForm/AddNewEventForm';
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

   const getCalendar = () => {
      const [ promise, abort ] = backend.query.roomMetadataAndEvents( roomId, startDate );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   };

   const refreshCalendar = () => {
      backend.cache.reset();
      setTimeout( getCalendar, 500 );
   };

   useEffect( getCalendar, [ roomId, backend ] );

   const [ drawerOpen, setDrawerOpen ] = useState( false );
   const openDrawer = () => setDrawerOpen( true );
   const closeDrawer = () => setDrawerOpen( false );

   const canAdd = backend.auth.can( 'add event' )
      && backend.auth.can( 'list users' );

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

         <EventList
            eventsData={ room.events }
            startDate={ startDate }
            isCompact={ isCompact }
            onEventDeleted={ () => refreshCalendar() }/>

         <Drawer
            title="Add an event"
            width="min(600px, 90%)"
            onClose={ closeDrawer }
            visible={ drawerOpen }
            bodyStyle={ { paddingBottom: 80 } }>
            { canAdd ? <AddNewEventForm room={ room.calendar } onSubmit={ () => {
               closeDrawer();
               refreshCalendar();
            } } /> : null }
         </Drawer>
      </>;
};

export default RoomDetails;
