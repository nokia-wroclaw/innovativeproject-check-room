import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { CenteredButton, FullWidthDatePicker, FullWidthRangePicker } from '../../components/StyledFormComponents/StyledFormComponents';
import BackendContext from '../../services/communication/BackendContext';
import { StyledAddNewEventToRoom } from './AddNewEventToRoom_styles';
import RoomHeader from '../../components/RoomHeader/RoomHeader';

const { TextArea } = Input;

const nextHour = ( num = 1 ) => {
   const currentHour = moment().hour();

   return moment( `${ currentHour + num }:00`, 'HH:mm' );
};

const AddNewEventToRoom = ( { room } ) => {
   const backend = useContext( BackendContext );
   const [ isWaiting, setIsWaiting ] = useState( false );

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
      const [ promise ] = backend.addEvent( room.id, event );
      promise.then( () => {
         backend.invalidateCache();
         setTimeout( () => {
            window.location.reload();
         }, 500 );
      } ).catch( () => {
         setIsWaiting( false );
      } );
   };

   return (
      <StyledAddNewEventToRoom>
         <RoomHeader roomData={ room } />

         <Form
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
               <TextArea
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
};
