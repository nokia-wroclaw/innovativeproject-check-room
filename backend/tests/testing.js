const supertest = require( 'supertest' );
const { CalendarClient } = require( '../app/calendar-client' );
const app = require( '../app' );
const { GoogleCalendarMock } = require( './google-calendar-mock' );

CalendarClient.connection = new GoogleCalendarMock();

const request = supertest( app );

module.exports = { request };
