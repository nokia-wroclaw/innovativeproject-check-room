import React from 'react';
import { Input, Form, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import {
   StyledTextArea, FullWidthInputNumber,
} from '../StyledFormComponents/StyledFormComponents';
import { StyledEditRoomForm } from './EditRoomForm_styles';

const EditRoomForm = ( { room, onUpdate } ) => {
   const [ form ] = Form.useForm();

   const onValuesChange = ( changedFields, allFields ) => onUpdate( allFields );

   return (
      <StyledEditRoomForm>
         <Form
            form={ form }
            initialValues={ room }
            onValuesChange={ onValuesChange }
            hideRequiredMark
         >
            <Form.Item
               label="Room name"
               name="name"
               rules={ [ { required: true, message: 'Please input room name!' } ] }
            >
               <Input placeholder="Room name" />
            </Form.Item>

            <Form.Item label="Description" name="description">
               <StyledTextArea
                  placeholder="Description"
                  autoSize={ { minRows: 2 } }
               />
            </Form.Item>

            <Form.Item label="Number of seats" name="seatsNo">
               <FullWidthInputNumber
                  min={ 0 }
                  placeholder="Seats"
                  type="number"
                  inputtype="numeric"
                  pattern="[0-9]*"
               />
            </Form.Item>

            <Form.Item label="Building" name="building">
               <Input placeholder="Building" />
            </Form.Item>

            <Form.Item label="Floor" name="floorNo">
               <FullWidthInputNumber
                  min={ 0 }
                  placeholder="Floor"
                  type="number"
                  inputtype="numeric"
                  pattern="[0-9]*"
               />
            </Form.Item>

            <Form.Item valuePropName="checked" name="hasProjector">
               <Checkbox>Projector</Checkbox>
            </Form.Item>

            <Form.Item valuePropName="checked" name="hasWhiteboard">
               <Checkbox>Whiteboard</Checkbox>
            </Form.Item>
         </Form>
      </StyledEditRoomForm>
   );
};

EditRoomForm.propTypes = {
   room: PropTypes.shape( {
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      building: PropTypes.string,
      floorNo: PropTypes.number,
      seatsNo: PropTypes.number,
      hasProjector: PropTypes.bool,
      hasWhiteboard: PropTypes.bool,
   } ).isRequired,
   onUpdate: PropTypes.func.isRequired,
};

export default EditRoomForm;
