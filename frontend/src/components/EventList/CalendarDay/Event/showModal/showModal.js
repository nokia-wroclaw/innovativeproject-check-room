import React from 'react';
import { Modal } from 'antd';
import {
   EventDescription,
   LinkLikeButton,
} from './showModal_styles';

const showModal = ( event ) => {
   Modal.info( {
      title: event.summary || '(no name)',
      content: (
         <EventDescription>
            <p>{ event.description || 'No description.' }</p>

            <p><a
               href={ event.htmlLink }
               target="_blank"
               rel="noopener noreferrer"
            >
               Open in Google Calendar
            </a></p>

            { event.ownedByCurrentUser
               ? <p><LinkLikeButton>
                  Remove
               </LinkLikeButton></p>
               : null }
         </EventDescription>
      ),
      icon: null,
      maskClosable: true,
      okType: 'default',
   } );
};

export default showModal;
