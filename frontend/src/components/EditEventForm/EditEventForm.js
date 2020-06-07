import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import {
   StyledTextArea,
} from '../StyledFormComponents/StyledFormComponents';
import { StyledEditEventForm } from './EditEventForm_styles';

// Unlike AddNewEventForm, this form does
// not have its own submit button.
const EditEventForm = ( { event, onUpdate } ) => {
   const [ form ] = Form.useForm();

   const onValuesChange = ( changedFields, allFields ) => onUpdate( allFields );

   return (
      <StyledEditEventForm>
         <Form
            form={ form }
            initialValues={ {
               eventName: event.summary,
               eventDescription: event.description,
            } }
            onValuesChange={ onValuesChange }
            hideRequiredMark
         >
            <Form.Item
               label="Event name"
               name="eventName"
               rules={ [ { required: true, message: 'Please input event name!' } ] }
            >
               <Input placeholder="Event name" />
            </Form.Item>

            <Form.Item label="Description" name="eventDescription">
               <StyledTextArea
                  placeholder="Description"
                  autoSize={ { minRows: 2 } }
               />
            </Form.Item>
         </Form>
      </StyledEditEventForm>
   );
};

export default EditEventForm;

EditEventForm.propTypes = {
   event: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      end: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      ownedByCurrentUser: PropTypes.bool,
   } ).isRequired,
   onUpdate: PropTypes.func.isRequired,
};
