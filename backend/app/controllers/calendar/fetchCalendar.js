const moment = require( 'moment' );
const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );

const paramsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[^@]+/ ),
} );

const querySchema = yup.object().shape( {
   startDate: yup.string().required(),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const query = await querySchema.validate( req.query );

      const startDate = moment( query.startDate );

      const client = new CalendarClient();
      const calendar = await client.getCalendar( params.calendar );
      const events = await client.getEvents( params.calendar, startDate );
      res.send( { calendar, events } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
