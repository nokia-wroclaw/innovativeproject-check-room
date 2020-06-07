import React from 'react';
import { Modal } from 'antd';
import { DialogContent, EventTitle, EventDescription } from './EventRemovalModal_styles';

const showEventRemovalModal = ( event, removeEvent ) => {
   Modal.confirm( {
      title: 'Are you sure you want to remove this event?',
      content: (
         <DialogContent>
            <EventTitle>{ event.summary || '(no name)' }</EventTitle>
            <EventDescription>{ event.description || 'No description.' }</EventDescription>
         </DialogContent>
      ),
      maskClosable: true,
      okType: 'danger',
      okText: 'Yes',
      onOk: () => {
         removeEvent( event.id );
      },
   } );
};

export default showEventRemovalModal;
