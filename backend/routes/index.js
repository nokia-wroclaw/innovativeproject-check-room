const express = require( 'express' );
const { listEvents, listCalendars } = require( '../app/calendar' );

const router = express.Router();

router.get( '/config', function ( req, res ) {
   res.send( {
      appName: 'Check Room',
   } );
} );

router.get( '/calendars', async function ( req, res ) {
   const calendars = await listCalendars();
   res.send( calendars );
} );

router.get( '/events/:calendar', async function ( req, res ) {
   const calendarUri = `${req.params.calendar}@group.calendar.google.com`;

   // Ensure the calendar exists.
   const calendars = await listCalendars();
   const exists = calendars.some( ( calendar ) => calendar.id === calendarUri );
   if ( !exists ) throw new Error( 'Calendar does not exist.' );

   const events = await listEvents( calendarUri );
   res.send( events );
} );

module.exports = router;
