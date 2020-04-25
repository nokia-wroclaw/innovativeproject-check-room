const express = require( 'express' );

const router = express.Router();

const listCalendars = require( '../app/controllers/calendar/listCalendars' );
const fetchCalendar = require( '../app/controllers/calendar/fetchCalendar' );
const addEvent = require( '../app/controllers/calendar/addEvent' );

router.get( '/calendars', listCalendars );
router.get( '/calendar/:calendar', fetchCalendar );
router.post( '/calendar/:calendar', addEvent );

module.exports = router;
