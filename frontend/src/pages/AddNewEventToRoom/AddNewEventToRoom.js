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
      } ).catch( () => { } );

      return abort;
   }, [ roomId, backend ] );

   const [ isWaiting, setIsWaiting ] = useState( false );
   const history = useHistory();

   const addEvent = ( values ) => {
      const startEventTime = values.eventTime[0];
      const endEventTime = values.eventTime[1];
      const event = {
         startDate: moment( values.eventDate ).set( {
            hour: startEventTime.hour(),
            minute: startEventTime.minute(),
            second: 0,
         } ).format(),
         endDate: moment( values.eventDate ).set( {
            hour: endEventTime.hour(),
            minute: endEventTime.minute(),
            second: 0,
         } ).format(),
         summary: values.eventName,
         description: values.eventDescription,
      };
      setIsWaiting( true );
      const [ promise ] = backend.addEvent( roomId, event );
      promise.then( () => {
         backend.invalidateCache();
         setTimeout( () => {
            history.push( roomPath );
         }, 500 );
      } ).catch( () => {
         setIsWaiting( false );
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
         <Form
            initialValues={ {
               'eventDate': moment().startOf( 'day' ),
               'eventTime': [ nextHour( 1 ), nextHour( 2 ) ],
            } }
            onFinish={ addEvent }
         >
            <Form.Item
               label="Event name"
               name="eventName"
               rules={ [ { required: true, message: 'Please input event name!' } ] }
            >
               <Input
                  placeholder="Event name"
               />
            </Form.Item>

            <Form.Item
               name="eventDate"
               rules={ [ { required: true, message: 'Please input event date!' } ] }
            >
               <DatePicker
                  inputReadOnly
                  style={ { display: 'flex' } }
               />
            </Form.Item>

            <Form.Item
               name="eventTime"
               rules={ [ { required: true, message: 'Please input event time!' } ] }
            >
               <RangePicker
                  inputReadOnly
                  style={ { display: 'flex' } }
                  format="HH:mm"
                  minuteStep={ 5 }
               />
            </Form.Item>

            <Form.Item
               label="Description"
               name="eventDescription">
               <TextArea
                  placeholder="Description"
                  autoSize={ { minRows: 2 } }
               />
            </Form.Item>

            <Button
               type="primary"
               style={ { display: 'block', margin: '0 auto' } }
               loading={ isWaiting }
               htmlType="submit">
               Add event
            </Button>
         </Form>
      </StyledAddNewEventToRoom>
   );
};

export default AddNewEventToRoom;
