const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );

const bodySchema = yup.object().shape( {
   id: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'manage rooms' );

      const client = new CalendarClient();
      await client.deleteCalendar( body.id );

      res.send( {} );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
