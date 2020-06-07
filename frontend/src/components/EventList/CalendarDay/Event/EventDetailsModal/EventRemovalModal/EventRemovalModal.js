import React from 'react';
import { Modal } from 'antd';
import { DialogContent } from './EventRemovalModal_styles';

const showEventRemovalModal = ( event, removeEvent ) => {
   Modal.confirm( {
      title: 'Are you sure you want to remove this event?',
      content: (
         <DialogContent>
            <p>{ event.summary || '(no name)' }</p>
            <p>{ event.description || 'No description.' }</p>
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
