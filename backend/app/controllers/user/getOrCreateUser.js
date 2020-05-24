const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );

module.exports = async ( req, res ) => {
   try {
      const user = await new FindOrCreateUserService().fromRequest( req );
      const permissions = new UserPolicy( user ).listPermissions();

      res.send( { user, permissions } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
