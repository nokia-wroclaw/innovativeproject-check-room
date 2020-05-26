const User = require( '../../schema/user' );
const DBConnection = require( '../database/DBConnection' );

class FindUserEmailService {
   async fromId( id ) {
      await new DBConnection().make();
      const user = await User.findById( id ).exec();

      return user.email;
   }

   async fromIds( ids ) {
      return Promise.all( ids.map( ( id ) => this.fromId( id ) ) );
   }
}

module.exports = FindUserEmailService;
