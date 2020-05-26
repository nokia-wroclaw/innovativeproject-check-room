const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );
const User = require( '../../../schema/user' );
const DBConnection = require( '../../database/DBConnection' );

module.exports = async ( req, res ) => {
   try {
      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'list users' );

      await new DBConnection().make();
      const users = await User.find( {} ).exec();

      res.send( users );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
