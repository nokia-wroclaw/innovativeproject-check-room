import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { CenteredButton, FullWidthDatePicker, FullWidthRangePicker, StyledTextArea } from '../../components/StyledFormComponents/StyledFormComponents';
import BackendContext from '../../services/communication/BackendContext';
import { StyledAddNewEventToRoom } from './AddNewEventToRoom_styles';
import RoomHeader from '../../components/RoomHeader/RoomHeader';

const nextHour = ( num = 1 ) => {
   const currentHour = moment().hour();

   return moment( `${ ( currentHour + num ) % 24 }:00`, 'HH:mm' );
};

const mergeDateWithTime = ( date, time ) =>
   moment( date ).set( {
      hour: time.hour(),
      minute: time.minute(),
      second: 0
   } ).format();

const AddNewEventToRoom = ( { room, updateCalendar } ) => {
   const backend = useContext( BackendContext );
   const [ isWaiting, setIsWaiting ] = useState( false );

   const [ form ] = Form.useForm();

   const addEvent = ( values ) => {
      const startEventTime = values.eventTime[0];
      const endEventTime = values.eventTime[1];
      const event = {
         startDate: mergeDateWithTime( values.eventDate, startEventTime ),
         endDate: mergeDateWithTime( values.eventDate, endEventTime ),
         summary: values.eventName,
         description: values.eventDescription,
      };
      setIsWaiting( true );
      const [ promise ] = backend.command.addEvent( room.id, event );
      promise.then( () => {
         backend.cache.reset();
         setTimeout( () => {
            updateCalendar();
            form.resetFields();
            setIsWaiting( false );
         }, 500 );
      } ).catch( () => {
         setIsWaiting( false );
      } );
   };

   return (
      <StyledAddNewEventToRoom>
         <RoomHeader roomData={ room } />

         <Form
            form={ form }
            initialValues={ {
               'eventDate': moment().startOf( 'day' ),
               'eventTime': [ nextHour( 1 ), nextHour( 2 ) ],
            } }
            onFinish={ addEvent }
            hideRequiredMark>

            <Form.Item
               label="Event name"
               name="eventName"
               rules={ [ { required: true, message: 'Please input event name!' } ] }>
               <Input placeholder="Event name" />
            </Form.Item>

            <Form.Item
               name="eventDate"
               rules={ [ { required: true, message: 'Please input event date!' } ] }>
               <FullWidthDatePicker inputReadOnly />
            </Form.Item>

            <Form.Item
               name="eventTime"
               rules={ [ { required: true, message: 'Please input event time!' } ] }>
               <FullWidthRangePicker
                  inputReadOnly
                  format="HH:mm"
                  minuteStep={ 5 } />
            </Form.Item>

            <Form.Item
               label="Description"
               name="eventDescription">
               <StyledTextArea
                  placeholder="Description"
                  autoSize={ { minRows: 2 } } />
            </Form.Item>

            <CenteredButton
               type="primary"
               loading={ isWaiting }
               htmlType="submit">
               Add event
            </CenteredButton>
         </Form>
      </StyledAddNewEventToRoom>
   );
};

export default AddNewEventToRoom;


AddNewEventToRoom.propTypes = {
   room: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   } ).isRequired,
   updateCalendar: PropTypes.func.isRequired,
};
