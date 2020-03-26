const express = require( 'express' );
const { listEvents, listCalendars } = require( '../app/calendar' );

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

router.get( '/events/:calendar', async ( req, res ) => {
   const calendarUri = `${req.params.calendar}@group.calendar.google.com`;

   // Ensure the calendar exists.
   const calendars = await listCalendars();
   const exists = calendars.some( ( calendar ) => calendar.id === calendarUri );

   if ( !exists ) {
      res.status( 500 ).send( 'Calendar does not exist.' );

      return;
   }

   const events = await listEvents( calendarUri );
   res.send( events );
} );

module.exports = router;
