import React from 'react';
import { Modal } from 'antd';
import { DialogContent } from './EventUpdatingModal_styles';

const showEventUpdatingModal = ( event, updateEvent ) => {
   Modal.confirm( {
      title: 'Update an event',
      content: (
         <DialogContent>
            TODO: implement
         </DialogContent>
      ),
      maskClosable: true,
      okType: 'default',
      okText: 'Save',
      onOk: () => {
         updateEvent( event );
      },
   } );
};

export default showEventUpdatingModal;
