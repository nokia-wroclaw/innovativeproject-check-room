import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { DatePicker, TimePicker, Input, Form, Button } from 'antd';
import BackendContext from '../../services/communication/BackendContext';
import { StyledAddNewEventToRoom, StyledForm } from './AddNewEventToRoom_styles';
import RoomHeader from '../../components/RoomHeader/RoomHeader';

const { TextArea } = Input;
const { RangePicker } = TimePicker;

const nextHour = ( num = 1 ) => {
   const currentHour = moment().hour();

   return moment( `${ currentHour + num }:00`, 'HH:mm' );
};

const AddNewEventToRoom = () => {
   const currentPath = useLocation().pathname;
   const roomPath = currentPath.substring( 0, currentPath.lastIndexOf( '/' ) );

   const [ room, setRoom ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const { roomId } = useParams();
   const backend = useContext( BackendContext );

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      const [ promise, abort ] = backend.fetchCalendar( roomId, startDateTmp );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } );

      return abort;
   }, [ roomId, backend ] );

   const [ eventName, setEventName ] = useState( '' );
   const [ eventDescription, setEventDescription ] = useState( '' );
   const [ eventDate, setEventDate ] = useState( moment().startOf( 'day' ) );
   const [ eventTime, setEventTime ] = useState( [ nextHour( 1 ), nextHour( 2 ) ] );

   const [ isWaiting, setIsWaiting ] = useState( false );
   const history = useHistory();

   const addEvent = () => {
      const event = {
         startDate: moment( eventDate ).set( {
            hour: eventTime[0].hour(),
            minute: eventTime[0].minute()
         } ).format(),
         endDate: moment( eventDate ).set( {
            hour: eventTime[1].hour(),
            minute: eventTime[1].minute()
         } ).format(),
         summary: eventName,
         description: eventDescription,
      };
      setIsWaiting( true );
      const [ promise ] = backend.addEvent( roomId, event );
      promise.then( () => {
         backend.invalidateCache();
         setTimeout( () => {
            history.push( roomPath );
         }, 500 );
      } );
   };

   return (
      <StyledAddNewEventToRoom>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <RoomHeader roomData={ room.calendar } />
         ) }
         <Link to={ roomPath }>Go Back</Link>
         <StyledForm>
            <Form.Item
               label="Event Name"
               name="eventName"
            >
               <Input
                  placeholder="Event name"
                  value={ eventName }
                  onChange={ ( e ) => setEventName( e.target.value ) } />
            </Form.Item>

            <DatePicker
               defaultValue={ eventDate }
               onChange={ ( val ) => setEventDate( val ) }
            />

            <RangePicker
               defaultValue={ eventTime }
               format="HH:mm"
               onChange={ ( val ) => setEventTime( val ) }

            />

            <TextArea
               placeholder="Description"
               autoSize={ { minRows: 2 } }
               value={ eventDescription }
               onChange={ ( e ) => setEventDescription( e.target.value ) }
            />

            <Button
               type="primary"
               onClick={ addEvent }
               loading={ isWaiting }>
               Add event
            </Button>
         </StyledForm>
      </StyledAddNewEventToRoom>
   );
};

export default AddNewEventToRoom;
