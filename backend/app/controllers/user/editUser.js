const yup = require( 'yup' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );
const User = require( '../../../schema/user' );
const DBConnection = require( '../../database/DBConnection' );

const bodySchema = yup.object().shape( {
   id: yup.string().required(),
   newType: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'manage users' );

      await new DBConnection().make();
      const newUser = await User.updateOne( { _id: body.id }, { type: body.newType } ).exec();

      res.send( newUser );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
