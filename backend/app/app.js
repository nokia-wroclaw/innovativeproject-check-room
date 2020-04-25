const express = require( 'express' );
const logger = require( 'morgan' );
const Cors = require( './middleware/cors/Automatic' );
const TokenRequired = require( './middleware/TokenRequired' );
const indexRouter = require( '../routes/index' );

require( 'dotenv' ).config();

const app = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.set( 'trust proxy', true );
app.set( 'trust proxy', 'loopback' );

app.use( new Cors().handler() );
app.use( new TokenRequired().handler() );

app.use( '/api', indexRouter );

module.exports = app;
