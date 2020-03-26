const express = require( 'express' );
const { getCalendar, getEvents, listCalendars } = require( '../app/calendar' );

const router = express.Router();

router.get( '/config', ( req, res ) => {
   res.send( {
      appName: 'Check Room',
   } );
} );

router.get( '/calendars', async ( req, res ) => {
   const calendars = await listCalendars();
   res.send( calendars );
} );

router.get( '/calendar/:calendar', async ( req, res ) => {
   const calendarUri = `${req.params.calendar}@group.calendar.google.com`;

   try {
      const calendar = await getCalendar( calendarUri );
      const events = await getEvents( calendar.id );
      res.send( { calendar, events } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

module.exports = router;
