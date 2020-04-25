const supertest = require( 'supertest' );

const { CalendarClient } = require( '../app/CalendarClient' );
const { GoogleCalendarMock } = require( './GoogleCalendarMock' );

CalendarClient.connection = new GoogleCalendarMock();

const Cors = require( '../middleware/cors/Automatic' );
const AllAllowed = require( '../middleware/cors/AllAllowed' );

Cors.policy = AllAllowed;

const TokenRequired = require( '../middleware/TokenRequired' );

TokenRequired.disabled = true;

const app = require( '../app' );

const request = supertest( app );

module.exports = { request };
