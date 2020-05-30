const EventOwner = require( '../../schema/event-owner' );
const DBConnection = require( '../database/DBConnection' );

class EventOwnerService {
   async makeUserAnOwnerOf( user, event ) {
      await new DBConnection().make();
      const pair = await new EventOwner( {
         userId: user.id,
         googleEventId: event.id,
      } ).save();

      return pair;
   }

   async isUserAnOwnerOf( user, event ) {
      await new DBConnection().make();
      const result = await EventOwner.exists( {
         userId: user.id,
         googleEventId: event.id,
      } );

      return result;
   }
}

module.exports = EventOwnerService;
