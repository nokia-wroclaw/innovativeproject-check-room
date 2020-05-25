const User = require( '../../schema/user' );
const DBConnection = require( '../database/DBConnection' );
const GoogleOAuthClient = require( '../auth/GoogleOAuthClient' );

class FindOrCreateUserService {
   async fromGoogleUser( googleUser ) {
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

      return user;
   }

   async fromToken( token ) {
      const googleUser = await new GoogleOAuthClient().verify( token );

      return this.fromGoogleUser( googleUser );
   }

   async fromRequest( req ) {
      const token = req.header( 'X-GOOGLE-AUTH' );

      return this.fromToken( token );
   }
}

module.exports = FindOrCreateUserService;
