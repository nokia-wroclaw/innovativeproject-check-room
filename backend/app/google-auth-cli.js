const readline = require( 'readline' );
const fs = require( 'fs' );
const { google } = require( 'googleapis' );

// If modifying these scopes, delete token.json.
const SCOPES = [ 'https://www.googleapis.com/auth/calendar.readonly' ];

// Load client secrets from a local file.
const credentialsStr = fs.readFileSync( 'credentials.json' );
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

      fs.writeFileSync( 'token.json', JSON.stringify( token ) );
      console.log( 'Created token.json!' );
   } );
} );
