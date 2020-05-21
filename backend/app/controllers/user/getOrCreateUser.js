const yup = require( 'yup' );
const User = require( '../../../schema/user' );
const DBConnection = require( '../../database/DBConnection' );
const GoogleOAuthClient = require( '../../auth/GoogleOAuthClient' );

module.exports = async ( req, res ) => {
   try {
      const token = req.header( 'X-GOOGLE-AUTH' );

      if ( !token ) {
         throw new Error( 'Missing user token' );
      }

      const OAuthClient = new GoogleOAuthClient();
      const googleUser = await OAuthClient.verify( token );

      await new DBConnection().make();
      let user = await User.findOne( { googleId: googleUser.id } ).exec();

      if ( !user ) {
         const newUser = {
            name: googleUser.name,
            email: googleUser.email,
            googleId: googleUser.id,
         };
         user = await new User( newUser ).save();
      }

      res.send( user );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
