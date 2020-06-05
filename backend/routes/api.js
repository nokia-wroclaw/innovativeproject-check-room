const express = require( 'express' );

const router = express.Router();

const listCalendars = require( '../app/controllers/calendar/listCalendars' );
const getFreeCalendars = require( '../app/controllers/calendar/getFreeCalendars' );
const addCalendar = require( '../app/controllers/calendar/addCalendar' );
const updateCalendar = require( '../app/controllers/calendar/updateCalendar' );

router.get( '/calendars', listCalendars );
router.post( '/calendars/free', getFreeCalendars );
router.post( '/calendars', addCalendar );
router.post( '/calendars/update/:calendar', updateCalendar );

const fetchCalendar = require( '../app/controllers/event/fetchCalendar' );
const addEvent = require( '../app/controllers/event/addEvent' );
const deleteEvent = require( '../app/controllers/event/deleteEvent' );

router.get( '/events/:calendar', fetchCalendar );
router.post( '/events/:calendar', addEvent );
router.post( '/events/delete/:calendar', deleteEvent );

const getOrCreateUser = require( '../app/controllers/user/getOrCreateUser' );
const editUser = require( '../app/controllers/user/editUser' );
const deleteUser = require( '../app/controllers/user/deleteUser' );
const listUsers = require( '../app/controllers/user/listUsers' );

router.get( '/user', getOrCreateUser );
router.post( '/user', editUser );
router.post( '/user/delete', deleteUser );
router.get( '/users', listUsers );

module.exports = router;
