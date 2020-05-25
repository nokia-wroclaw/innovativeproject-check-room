import React from 'react';
import { Modal } from 'antd';
import {
   EventDescription,
} from './showModal_styles';

const showModal = ( event ) => {
   Modal.info( {
      title: event.summary || '(no name)',
      content: (
         <EventDescription>
            <p>{ event.description || 'No description.' }</p>
            <a
               href={ event.htmlLink }
               target="_blank"
               rel="noopener noreferrer"
            >
               Open in Google Calendar
            </a>
         </EventDescription>
      ),
      icon: null,
      maskClosable: true,
      okType: 'default',
   } );
};

export default showModal;
