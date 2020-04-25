const { google } = require( 'googleapis' );

class Connection {
   constructor() {
      this.connection = google.calendar( { version: 'v3', auth: this.makeOAuthClient() } );
   }

   makeOAuthClient() {
      const credentialsStr = process.env.GOOGLE_API_CREDENTIALS;
      const token = process.env.GOOGLE_API_TOKEN;

      if ( credentialsStr === undefined || token === undefined ) {
         throw new Error( 'Credentials not specified' );
      }

      const credentials = JSON.parse( credentialsStr );

      // eslint-disable-next-line camelcase
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
         client_id, client_secret, redirect_uris[0],
      );

      oAuth2Client.setCredentials( JSON.parse( token ) );

      return oAuth2Client;
   }

   getConnection() {
      return this.connection;
   }
}

module.exports = Connection;
