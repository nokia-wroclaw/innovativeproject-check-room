const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserEventPolicy = require( '../../policies/UserEventPolicy' );

const paramsSchema = yup.object().shape( {
   calendar: yup
      .string()
      .required()
      .matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const bodySchema = yup.object().shape( {
   id: yup.string().required(),
   summary: yup.string().required().max( 200 ),
   description: yup.string().default( '' ),
   participants: yup.array( yup.string().email() ).default( [] ),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserEventPolicy( user.id, body.id ).wantsTo( 'edit event' );

      const eventData = {
         summary: body.summary,
         description: body.description,
         participants: body.participants,
      };

      const client = new CalendarClient();
      const event = await client.updateEvent( params.calendar, body.eventId, eventData );

      res.send( event );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
