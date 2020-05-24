const GoogleOAuthClient = require( '../../auth/GoogleOAuthClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );

module.exports = async ( req, res ) => {
   try {
      const token = req.header( 'X-GOOGLE-AUTH' );

      const googleUser = await new GoogleOAuthClient().verify( token );
      const user = await new FindOrCreateUserService().get( googleUser );

      res.send( user );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
