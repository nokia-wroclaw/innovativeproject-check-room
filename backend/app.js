const express = require( 'express' );
const logger = require( 'morgan' );
const Cors = require( './middleware/cors/automatic' );
const TokenRequired = require( './middleware/tokenRequired' );

require( 'dotenv' ).config();

const app = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.set( 'trust proxy', true );
app.set( 'trust proxy', 'loopback' );

app.use( new Cors().handler() );
app.use( new TokenRequired().handler() );

const indexRouter = require( './routes/index' );

app.use( '/api', indexRouter );

module.exports = app;
