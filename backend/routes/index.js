const express = require( 'express' );
const moment = require( 'moment' );
const yup = require( 'yup' );
const CalendarClient = require( '../app/calendar/CalendarClient' );

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

const calendarParamsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[^@]+/ ),
} );

const calendarQuerySchema = yup.object().shape( {
   startDate: yup.string().required(),
} );

router.get( '/calendar/:calendar', async ( req, res ) => {
   try {
      const params = await calendarParamsSchema.validate( req.params );
      const query = await calendarQuerySchema.validate( req.query );

      const startDate = moment( query.startDate );

      const client = new CalendarClient();
      const calendar = await client.getCalendar( params.calendar );
      const events = await client.getEvents( params.calendar, startDate );
      res.send( { calendar, events } );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
} );

const addEventParamsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const addEventBodySchema = yup.object().shape( {
   startDate: yup.string().required(),
   endDate: yup.string().required(),
   summary: yup.string().required().max( 200 ),
   description: yup.string().required(),
} );

router.post( '/calendar/:calendar', async ( req, res ) => {
   try {
      const params = await addEventParamsSchema.validate( req.params );
      const body = await addEventBodySchema.validate( req.body );

      const event = {
         calendar: params.calendar,
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
