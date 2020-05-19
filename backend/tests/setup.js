const supertest = require( 'supertest' );

const CalendarClient = require( '../app/calendar/CalendarClient' );
const CalendarConnection = require( './app/calendar/CalendarConnection' );

CalendarClient.connection = new CalendarConnection();

const Cors = require( '../app/middleware/cors/Automatic' );
const AllAllowed = require( '../app/middleware/cors/AllAllowed' );

Cors.policy = AllAllowed;

const TokenRequired = require( '../app/middleware/TokenRequired' );

TokenRequired.disabled = true;

const app = require( '../app/app' );

const request = supertest( app );

module.exports = { request };
