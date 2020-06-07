import React from 'react';
import { Modal } from 'antd';
import EditEventForm from '../../../../../EditEventForm/EditEventForm';
import { DialogContent } from './EventUpdatingModal_styles';


const showEventUpdatingModal = ( event, updateEvent ) => {
   let data = {
      summary: event.summary,
      description: event.description,
   };

   const onUpdate = ( values ) => {
      data = {
         summary: values.eventName,
         description: values.eventDescription,
      };
   };

   Modal.confirm( {
      title: 'Update an event',
      content: (
         <DialogContent>
            <EditEventForm event={ event } onUpdate={ onUpdate } />
         </DialogContent>
      ),
      maskClosable: true,
      okType: 'default',
      okText: 'Save',
      onOk: () => {
         updateEvent( data );
      },
   } );
};

export default showEventUpdatingModal;
