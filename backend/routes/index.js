const express = require( 'express' );
const moment = require( 'moment' );
const _ = require( 'lodash' );
const { CalendarClient } = require( '../app/CalendarClient' );

const assertPresent = ( val ) => {
   if ( typeof val === 'undefined' || val == null || val === '' ) {
      throw new Error( 'Missing required field.' );
   }

   return val;
};

const router = express.Router();

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

      const startDate = moment( assertPresent( req.query.startDate ) );

      const client = new CalendarClient();
      const calendar = await client.getCalendar( calendarUri );
      const events = await client.getEvents( calendar.id, startDate );
      res.send( { calendar, events } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

router.post( '/calendar/:calendar', async ( req, res ) => {
   try {
      const calendarUri = `${req.params.calendar}@group.calendar.google.com`;
      const bodyElements = [ 'startDate', 'endDate', 'summary', 'description' ];
      const body = _.pick( req.body, bodyElements );
      _.forEach( bodyElements, ( el ) => assertPresent( body[el] ) );

      const event = {
         calendar: calendarUri,
         start: moment( body.startDate ),
         end: moment( body.endDate ),
         summary: body.summary,
         description: body.description,
      };

      const client = new CalendarClient();
      const resp = await client.addEvent( event );
      res.send( resp );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

module.exports = router;
