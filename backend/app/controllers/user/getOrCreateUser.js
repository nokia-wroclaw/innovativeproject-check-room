const GoogleOAuthClient = require( '../../auth/GoogleOAuthClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );

module.exports = async ( req, res ) => {
   try {
      const user = await new FindOrCreateUserService().fromRequest( req );

      res.send( user );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
