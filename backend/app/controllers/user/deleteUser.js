const yup = require( 'yup' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );
const User = require( '../../../schema/user' );
const DBConnection = require( '../../database/DBConnection' );

const bodySchema = yup.object().shape( {
   id: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'manage users' );

      await new DBConnection().make();
      await User.deleteOne( { _id: body.id } ).exec();

      res.send( {} );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
