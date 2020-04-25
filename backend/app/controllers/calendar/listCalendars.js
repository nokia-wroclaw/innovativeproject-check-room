const CalendarClient = require( '../../calendar/CalendarClient' );

module.exports = async ( req, res ) => {
   try {
      const client = new CalendarClient();
      const calendars = await client.listCalendars();
      res.send( calendars );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
