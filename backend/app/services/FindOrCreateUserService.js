const User = require( '../../schema/user' );
const DBConnection = require( '../database/DBConnection' );

class FindOrCreateUserService {
   async get( googleUser ) {
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
   }
}

module.exports = FindOrCreateUserService;
