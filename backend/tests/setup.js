const supertest = require( 'supertest' );

const CalendarClient = require( '../app/calendar/CalendarClient' );
const Connection = require( './app/calendar/Connection' );

CalendarClient.connection = new Connection();

const Cors = require( '../app/middleware/cors/Automatic' );
const AllAllowed = require( '../app/middleware/cors/AllAllowed' );

Cors.policy = AllAllowed;

const TokenRequired = require( '../app/middleware/TokenRequired' );

TokenRequired.disabled = true;

const app = require( '../app/app' );

const request = supertest( app );

module.exports = { request };
