const express = require( 'express' );
const logger = require( 'morgan' );
const Sentry = require( '@sentry/node' );

require( 'dotenv' ).config();

Sentry.init( { dsn: process.env.SENTRY_DSN } );

const app = express();

app.use( Sentry.Handlers.requestHandler() );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.set( 'trust proxy', true );
app.set( 'trust proxy', 'loopback' );

const indexRouter = require( './routes/index' );

app.get( '/*', ( req, res, next ) => {
   res.header( 'Access-Control-Allow-Origin', ' http://localhost:3000' );
   next();
} );

app.use( '/api', indexRouter );

app.use( Sentry.Handlers.errorHandler() );

module.exports = app;
