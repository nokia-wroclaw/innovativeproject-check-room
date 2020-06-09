import React from 'react';
import { Modal } from 'antd';
import EditEventForm from '../../EditRoomForm/EditRoomForm';
import { DialogContent } from './RoomCreationModal_styles';

const showRoomCreationModal = ( createRoom ) => {
   const room = {};
   let data = room;

   const onUpdate = ( values ) => {
      data = { ...data, ...values };
   };

   Modal.confirm( {
      title: 'Add a room',
      content: (
         <DialogContent>
            <EditEventForm room={ room } onUpdate={ onUpdate } />
         </DialogContent>
      ),
      maskClosable: true,
      okType: 'default',
      okText: 'Add',
      onOk: () => {
         createRoom( data );
      },
   } );
};

export default showRoomCreationModal;
