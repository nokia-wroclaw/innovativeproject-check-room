import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { CenteredButton, FullWidthDatePicker, FullWidthRangePicker, StyledTextArea, FullWidthSelect, OptionMainLine, OptionSmallLine } from '../StyledFormComponents/StyledFormComponents';
import BackendContext from '../../services/communication/BackendContext';
import { StyledAddNewEventForm, StyledForm } from './AddNewEventForm_styles';
import RoomHeader from '../RoomHeader/RoomHeader';

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

const AddNewEventForm = ( { room, onSubmit } ) => {
   const backend = useContext( BackendContext );
   const [ isWaiting, setIsWaiting ] = useState( false ); // waiting for save
   const [ isLoading, setIsLoading ] = useState( false ); // loading user list
   const [ users, setUsers ] = useState( [] );
   const [ form ] = Form.useForm();

   useEffect( () => {
      if ( !backend.auth.can( 'list users' ) ) {
         setUsers( [] );
         setIsLoading( false );

         return undefined;
      }

      const [ promise, abort ] = backend.query.allUsers();
      promise.then( ( userList ) => {
         setUsers( userList );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ backend, backend.auth.user ] );

   const addEvent = ( values ) => {
      const startEventTime = values.eventTime[0];
      const endEventTime = values.eventTime[1];
      const event = {
         startDate: mergeDateWithTime( values.eventDate, startEventTime ),
         endDate: mergeDateWithTime( values.eventDate, endEventTime ),
         summary: values.eventName,
         description: values.eventDescription,
         participants: values.participants,
      };
      setIsWaiting( true );
      const [ promise ] = backend.command.addEvent( room.id, event );
      promise.then( () => {
         backend.cache.reset();
         setTimeout( () => {
            onSubmit();
            form.resetFields();
            setIsWaiting( false );
         }, 500 );
      } ).catch( () => {
         setIsWaiting( false );
      } );
   };

   return (
      <StyledAddNewEventForm>
         <RoomHeader roomData={ room } />

         <StyledForm
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

            <Form.Item
               label="Participants"
               name="participants">
               <FullWidthSelect
                  placeholder="Participants"
                  mode="tags"
                  loading={ isLoading }
                  disabled={ isLoading }
                  optionLabelProp="label">
                  { users.map( ( user ) => (
                     <FullWidthSelect.Option key={ user._id } value={ user.email } label={ user.email }>
                        <OptionMainLine>{ user.name }</OptionMainLine>
                        <OptionSmallLine>{ user.email }, { user.type }</OptionSmallLine>
                     </FullWidthSelect.Option>
                  ) ) }
               </FullWidthSelect>
            </Form.Item>

            <CenteredButton
               type="primary"
               loading={ isWaiting }
               htmlType="submit">
               Add event
            </CenteredButton>
         </StyledForm>
      </StyledAddNewEventForm>
   );
};

export default AddNewEventForm;


AddNewEventForm.propTypes = {
   room: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
   } ).isRequired,
   onSubmit: PropTypes.func.isRequired,
};
