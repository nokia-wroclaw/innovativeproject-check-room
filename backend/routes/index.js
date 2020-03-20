const express = require( 'express' );
const { listEvents, listCalendars } = require( '../app/calendar' );

const router = express.Router();

router.get( '/config', function ( req, res, next ) {
   res.send( {
      appName: 'Check Room',
   } );
} );

router.get( '/calendars', async function ( req, res, next ) {
   const calendars = await listCalendars();
   res.send( calendars );
} );

router.get( '/events/:calendar', async function ( req, res, next ) {
   const calendarRequested = req.params.calendar;

   // Ensure the calendar exists.
   const calendars = await listCalendars();
   const exists = calendars.some( ( calendar ) => calendar.id === calendarRequested );
   if ( !exists ) throw new Error( 'Calendar does not exist.' );

   const events = await listEvents( calendarRequested );
   res.send( events );
} );

module.exports = router;
