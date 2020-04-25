const express = require( 'express' );
const logger = require( 'morgan' );
const cors = require( './middleware/cors' );
const tokenRequired = require( './middleware/tokenRequired' );

require( 'dotenv' ).config();

const app = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.set( 'trust proxy', true );
app.set( 'trust proxy', 'loopback' );

app.use( cors() );
app.use( tokenRequired() );

const indexRouter = require( './routes/index' );

app.use( '/api', indexRouter );

module.exports = app;
