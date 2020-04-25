const supertest = require( 'supertest' );

const { CalendarClient } = require( '../app/calendar-client' );
const { GoogleCalendarMock } = require( './google-calendar-mock' );

CalendarClient.connection = new GoogleCalendarMock();

const Cors = require( '../middleware/cors/automatic' );
const AllAllowed = require( '../middleware/cors/allAllowed' );

Cors.policy = AllAllowed;

const TokenRequired = require( '../middleware/tokenRequired' );

TokenRequired.disabled = true;

const app = require( '../app' );

const request = supertest( app );

module.exports = { request };
