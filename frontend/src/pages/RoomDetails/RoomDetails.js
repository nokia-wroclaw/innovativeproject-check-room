import React, { useEffect, useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
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
   const [ startDate, setStartDate ] = useReducer(
      ( prevState, method ) => {
         const newDate = moment( prevState );

         setIsLoading( true );

         switch ( method ) {
         case 'nextWeek':
            newDate.add( 1, 'week' );
            break;
         case 'prevWeek':
            newDate.subtract( 1, 'week' );
            break;
         case 'nextThree':
            newDate.add( 3, 'days' );
            break;
         case 'prevThree':
            newDate.subtract( 3, 'days' );
            break;

         default:
         }

         return newDate.toISOString();
      },
      moment()
         .startOf( 'day' )
         .toISOString()
   );
   const [ isCompact, toggleIsCompact ] = useReducer( ( state ) => !state, false );
   const { roomId } = useParams();
   const backend = useContext( BackendContext );

   const getCalendar = () => {
      const [ promise, abort ] = backend.query.roomMetadataAndEvents(
         roomId,
         startDate
      );
      promise
         .then( ( data ) => {
            setRoom( data );
            setIsLoading( false );
         } )
         .catch( () => {} );

      return abort;
   };

   const refreshCalendar = () => {
      backend.cache.reset();
      setTimeout( getCalendar, 500 );
   };

   useEffect( getCalendar, [ roomId, backend, startDate ] );

   const [ drawerOpen, setDrawerOpen ] = useState( false );
   const openDrawer = () => setDrawerOpen( true );
   const closeDrawer = () => setDrawerOpen( false );

   const canAdd =
      backend.auth.can( 'add event' ) && backend.auth.can( 'list users' );

   return (
      <>
         { room && room.calendar && (
            <>
               <RoomHeader roomData={ room.calendar } />
               <FlexCenter style={ { display: 'flex' } }>
                  <Button
                     type="primary"
                     onClick={ () => setStartDate( 'prevThree' ) }
                     icon={ <CaretLeftOutlined /> }
                     size="large"
                  />
                  <QrCodeButton id={ roomId } />
                  <ToggleSwitch
                     toggleFunc={ toggleIsCompact }
                     value={ isCompact }
                     name="compact"
                  />
                  { canAdd ? (
                     <AddNewEventButton openDrawer={ openDrawer } />
                  ) : null }
                  <Button
                     type="primary"
                     onClick={ () => setStartDate( 'nextThree' ) }
                     icon={ <CaretRightOutlined /> }
                     size="large"
                     style={ { marginLeft: '10px' } }
                  />
               </FlexCenter>
            </>
         ) }

         { isLoading ? (
            <LoadingPage />
         ) : (
            <>
               <EventList
                  eventsData={ room.events }
                  startDate={ startDate }
                  isCompact={ isCompact }
                  onUpdate={ refreshCalendar }
               />
               <Drawer
                  title="Add an event"
                  width="min(600px, 90%)"
                  onClose={ closeDrawer }
                  visible={ drawerOpen }
                  bodyStyle={ { paddingBottom: 80 } }
               >
                  { canAdd ? (
                     <AddNewEventForm
                        room={ room.calendar }
                        onSubmit={ () => {
                           closeDrawer();
                           refreshCalendar();
                        } }
                     />
                  ) : null }
               </Drawer>
            </>
         ) }
      </>
   );
};

export default RoomDetails;
