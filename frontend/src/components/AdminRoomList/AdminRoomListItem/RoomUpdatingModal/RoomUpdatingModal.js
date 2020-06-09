import React from 'react';
import { Modal } from 'antd';
import EditEventForm from '../../../EditRoomForm/EditRoomForm';
import { DialogContent } from './RoomUpdatingModal_styles';

const showRoomUpdatingModal = ( room, updateRoom ) => {
   let data = room;

   if ( room.location ) {
      data.building = room.location.building;
      data.floorNo = room.location.floorNo;
   }

   const onUpdate = ( values ) => {
      data = { ...data, ...values };
   };

   Modal.confirm( {
      title: 'Edit a room',
      content: (
         <DialogContent>
            <EditEventForm room={ room } onUpdate={ onUpdate } />
         </DialogContent>
      ),
      maskClosable: true,
      okType: 'default',
      okText: 'Save',
      onOk: () => {
         updateRoom( data );
      },
   } );
};

export default showRoomUpdatingModal;
