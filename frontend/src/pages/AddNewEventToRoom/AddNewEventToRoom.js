import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { DatePicker, TimePicker, Input, Form, Button } from 'antd';
import BackendContext from '../../services/communication/BackendContext';
import { StyledAddNewEventToRoom } from './AddNewEventToRoom_styles';
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
            minute: eventTime[0].minute(),
            second: 0,
         } ).format(),
         endDate: moment( eventDate ).set( {
            hour: eventTime[1].hour(),
            minute: eventTime[1].minute(),
            second: 0,
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

   const [ form ] = Form.useForm();

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
         <Form
            form={ form }
            initialValues={ {
               'eventName': eventName,
               'eventDate': eventDate,
               'eventTime': eventTime,
               'eventDescription': eventDescription,
            } }
         >
            <Form.Item
               label="Event name"
               name="eventName"
               rules={ [ { required: true, message: 'Please input event name!' } ] }
            >
               <Input
                  placeholder="Event name"
                  onChange={ ( e ) => setEventName( e.target.value ) } />
            </Form.Item>

            <Form.Item
               name="eventDate"
               rules={ [ { required: true, message: 'Please input event date!' } ] }
            >
               <DatePicker
                  style={ { display: 'flex' } }
                  onChange={ ( val ) => setEventDate( val ) }
               />
            </Form.Item>


            <Form.Item
               name="eventTime"
               rules={ [ { required: true, message: 'Please input event time!' } ] }
            >
               <RangePicker
                  style={ { display: 'flex' } }
                  format="HH:mm"
                  onChange={ ( val ) => setEventTime( val ) }
               />
            </Form.Item>


            <Form.Item
               label="Description"
               name="eventDescription">
               <TextArea
                  placeholder="Description"
                  autoSize={ { minRows: 2 } }
                  onChange={ ( e ) => setEventDescription( e.target.value ) }
               />
            </Form.Item>

            <Button
               type="primary"
               style={ { display: 'block', margin: '0 auto' } }
               onClick={ addEvent }
               loading={ isWaiting }>
               Add event
            </Button>
         </Form>
      </StyledAddNewEventToRoom>
   );
};

export default AddNewEventToRoom;
