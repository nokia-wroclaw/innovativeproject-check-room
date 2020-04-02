const express = require( 'express' );
const moment = require( 'moment' );
const { CalendarClient } = require( '../app/calendar-client' );

const router = express.Router();

router.get( '/config', ( req, res ) => {
   res.send( {
      appName: 'Check Room',
   } );
} );

router.get( '/calendars', async ( req, res ) => {
   try {
      const client = new CalendarClient();
      const calendars = await client.listCalendars();
      res.send( calendars );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

router.get( '/calendar/:calendar', async ( req, res ) => {
   try {
      const calendarUri = `${req.params.calendar}@group.calendar.google.com`;

      if ( typeof req.query.startDate === 'undefined' ) throw new Error( 'startDate is required' );
      const startDate = moment( req.query.startDate );

      const client = new CalendarClient();
      const calendar = await client.getCalendar( calendarUri );
      const events = await client.getEvents( calendar.id, startDate );
      res.send( { calendar, events } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

module.exports = router;
