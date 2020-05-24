const express = require( 'express' );

const router = express.Router();

const listCalendars = require( '../app/controllers/calendar/listCalendars' );
const fetchCalendar = require( '../app/controllers/calendar/fetchCalendar' );
const addEvent = require( '../app/controllers/calendar/addEvent' );

router.get( '/calendars', listCalendars );
router.get( '/calendar/:calendar', fetchCalendar );
router.post( '/calendar/:calendar', addEvent );

const getOrCreateUser = require( '../app/controllers/user/getOrCreateUser' );
const editUser = require( '../app/controllers/user/editUser' );
const listUsers = require( '../app/controllers/user/listUsers' );

router.get( '/user', getOrCreateUser );
router.post( '/user', editUser );
router.get( '/users', listUsers );

module.exports = router;
