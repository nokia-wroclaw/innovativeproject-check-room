const EventOwnerService = require( '../services/EventOwnerService' );

const ownerCan = [
   'edit event',
   'delete event',
];

class EventPolicy {
   constructor( userId, eventId ) {
      this.userId = userId;
      this.eventId = eventId;
   }

   isOwner() {
      return new EventOwnerService().isUserAnOwnerOf( this.userId, this.eventId );
   }

   listPermissions() {
      if ( this.isOwner() ) return ownerCan;

      return [];
   }

   can( action ) {
      return this.listPermissions().includes( action );
   }

   wantsTo( action ) {
      if ( !this.can( action ) ) {
         throw new Error( 'Not authorized!' );
      }
   }
}

module.exports = EventPolicy;
