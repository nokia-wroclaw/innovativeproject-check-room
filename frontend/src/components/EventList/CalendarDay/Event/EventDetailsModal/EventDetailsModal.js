import React from 'react';
import { Modal } from 'antd';
import showEventRemovalModal from './EventRemovalModal/EventRemovalModal';
import showEventUpdatingModal from './EventUpdatingModal/EventUpdatingModal';
import {
   EventDescription,
   LinkLikeButton,
} from './EventDetailsModal_styles';

const showEventDetailsModal = ( event, removeEvent, updateEvent ) => {
   let ref = null;
   ref = Modal.info( {
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

            { event.ownedByCurrentUser ? <p>
               <LinkLikeButton onClick={ () => {
                  showEventUpdatingModal( event, updateEvent );
                  ref.destroy();
               } }>
                  Edit
               </LinkLikeButton>
               { ' / ' }
               <LinkLikeButton onClick={ () => {
                  showEventRemovalModal( event, removeEvent );
                  ref.destroy();
               } }>
                     Remove
               </LinkLikeButton>
            </p> : null }
         </EventDescription>
      ),
      icon: null,
      maskClosable: true,
      okType: 'default',
   } );
};

export default showEventDetailsModal;
