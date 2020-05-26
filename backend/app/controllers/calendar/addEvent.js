const moment = require( 'moment' );
const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const FindUserEmailService = require( '../../services/FindUserEmailService' );
const UserPolicy = require( '../../policies/UserPolicy' );

const paramsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const bodySchema = yup.object().shape( {
   startDate: yup.string().required(),
   endDate: yup.string().required(),
   summary: yup.string().required().max( 200 ),
   description: yup.string().default( '' ),
   participants: yup.array( yup.string() ).default( [] ),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'add event' );

      const participantEmails = await new FindUserEmailService().fromIds( body.participants );

      const event = {
         calendar: params.calendar,
         start: moment( body.startDate ),
         end: moment( body.endDate ),
         summary: body.summary,
         description: body.description,
         participants: participantEmails,
      };

      const client = new CalendarClient();
      const resp = await client.addEvent( event );
      res.send( resp );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
