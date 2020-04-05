const readline = require( 'readline' );
const fs = require( 'fs' );
const { google } = require( 'googleapis' );

require( 'dotenv' ).config();

// If modifying these scopes, regenerate the token.
const SCOPES = [ 'https://www.googleapis.com/auth/calendar' ];

// Load client secrets.
const credentialsStr = process.env.GOOGLE_API_CREDENTIALS;

if ( credentialsStr === undefined ) {
   console.error( 'Credentials not set' );
   process.exit( 1 );
}

const credentials = JSON.parse( credentialsStr );

// eslint-disable-next-line camelcase
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
   client_id, client_secret, redirect_uris[0],
);

const authUrl = oAuth2Client.generateAuthUrl( {
   access_type: 'offline',
   scope: SCOPES,
} );
console.log( 'Authorize this app by visiting this url:', authUrl );

const rl = readline.createInterface( {
   input: process.stdin,
   output: process.stdout,
} );
rl.question( 'Enter the code from that page here: ', ( code ) => {
   rl.close();
   oAuth2Client.getToken( code, ( err, token ) => {
      if ( err ) {
         console.error( 'Error retrieving access token', err );

         return;
      }

      console.log( `GOOGLE_API_TOKEN=${JSON.stringify( token )}` );
   } );
} );
