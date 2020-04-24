import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledEventModal, ModalEventName, ModalEventLink } from './EventModal_styles';

const EventModal = ( { event, toggleModal } ) => {
   const modal = useRef( null );

   const closeIfClickOutside = ( e ) => {
      if ( !modal.current.contains( e.target ) ) toggleModal();
   };

   useEffect( () => {
      document.addEventListener( 'mousedown', closeIfClickOutside );

      return () => {
         document.removeEventListener( 'mousedown', closeIfClickOutside );
      };
   }, [ closeIfClickOutside ] );

   return (
      <>
         <StyledEventModal ref={ modal }>
            <ModalEventName> { event.summary || '(no name)' }</ModalEventName>
            <p> { event.description } </p>
            <ModalEventLink href={ event.htmlLink } target="_blank" rel="noopener noreferrer">
               Link
            </ModalEventLink>
         </StyledEventModal>
      </>
   );
};

EventModal.propTypes = {
   event: PropTypes.shape( {
      id: PropTypes.string.isRequired,
      summary: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      end: PropTypes.shape( {
         dateTime: PropTypes.string.isRequired,
      } ).isRequired,
      htmlLink: PropTypes.string.isRequired,
   } ).isRequired,
   toggleModal: PropTypes.func.isRequired,
};

export default EventModal;
