const EventOwner = require( '../../schema/event-owner' );
const DBConnection = require( '../database/DBConnection' );
const FindOrCreateUserService = require( './FindOrCreateUserService' );

class EventOwnerService {
   async makeUserAnOwnerOf( userId, eventId ) {
      await new DBConnection().make();
      const ownershipPair = await new EventOwner( {
         userId,
         googleEventId: eventId,
      } ).save();

      return ownershipPair;
   }

   async removeOwnership( userId, eventId ) {
      await new DBConnection().make();
      const ownershipPair = await EventOwner.findOne( {
         userId,
         googleEventId: eventId,
      } ).exec();
      await ownershipPair.remove();
   }

   async isUserAnOwnerOf( userId, eventId ) {
      await new DBConnection().make();
      const result = await EventOwner.exists( {
         userId,
         googleEventId: eventId,
      } );

      return result;
   }

   async markOwnedEvents( user, events ) {
      await new DBConnection().make();
      const eventIds = events.map( ( event ) => event.id );
      const ownershipPairs = await EventOwner.find( {
         userId: user.id,
         googleEventId: { $in: eventIds },
      } ).exec();
      const ownedEventIds = ownershipPairs.map( ( pair ) => pair.googleEventId );

      const isOwned = ( event ) => ownedEventIds.includes( event.id );
      const markEvent = ( event ) => (
         isOwned( event ) ? { ownedByCurrentUser: true, ...event } : event );

      return events.map( markEvent );
   }

   async markOwnedEventsFromRequest( req, events ) {
      try {
         const user = await new FindOrCreateUserService().fromRequest( req );

         return this.markOwnedEvents( user, events );
      }
      catch ( e ) {
         return events; // User is not logged in.
      }
   }
}

module.exports = EventOwnerService;
