const moment = require( 'moment' );
const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );

const bodySchema = yup.object().shape( {
   startDate: yup.string().required(),
   endDate: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'get free calendars' );

      const client = new CalendarClient();
      const allCalendars = await client.listCalendars();
      const calendarIds = await client.filterFreeCalendars(
         allCalendars,
         moment( body.startDate ),
         moment( body.endDate ),
      );
      res.send( calendarIds );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
