const fs = require( 'fs' );
const { google } = require( 'googleapis' );

/** Create an OAuth2 client with the given credentials. */
function authorize() {
   // Load client secrets from a local file.
   const credentialsStr = fs.readFileSync( 'credentials.json' );
   const credentials = JSON.parse( credentialsStr );

   // eslint-disable-next-line camelcase
   const { client_secret, client_id, redirect_uris } = credentials.installed;
   const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0],
   );

   const token = fs.readFileSync( 'token.json' );
   oAuth2Client.setCredentials( JSON.parse( token ) );

   return oAuth2Client;
}

module.exports = { authorize };
