const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const EventOwnerService = require( '../../services/EventOwnerService' );

const paramsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const bodySchema = yup.object().shape( {
   id: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      const isOwner = await new EventOwnerService().isUserAnOwnerOf( user.id, body.id );

      if ( !isOwner ) {
         throw new Error( 'Not authorized' );
      }

      const client = new CalendarClient();
      await client.deleteEvent( params.calendar, body.id );

      await new EventOwnerService().removeOwnership( user.id, body.id );

      res.send( {} );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
