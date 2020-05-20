const yup = require( 'yup' );
const User = require( '../../../schema/user' );
const DBConnection = require( '../../database/DBConnection' );
const GoogleOAuthClient = require( '../../auth/GoogleOAuthClient' );

module.exports = async ( req, res ) => {
   try {
      console.log( req.headers );
      const token = req.header( 'X-GOOGLE-AUTH' );

      if ( !token ) {
         throw new Error( 'Missing user token' );
      }

      const OAuthClient = new GoogleOAuthClient();
      const googleId = await OAuthClient.verify( token );

      await new DBConnection().make();
      const user = await User.findOne( { googleId } ).exec();

      if ( !user ) {
         // TODO: create an user.
      }

      res.send( user );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
