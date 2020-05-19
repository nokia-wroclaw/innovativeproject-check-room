const { OAuth2Client } = require( 'google-auth-library' );

class GoogleOAuthConnection {
   constructor() {
      this.clientId = process.env.GOOGLE_CLIENT_ID;

      if ( this.clientId === undefined ) {
         throw new Error( 'Google client ID is missing' );
      }

      this.connection = new OAuth2Client( this.clientId );
   }

   getConnection() {
      return this.connection;
   }
}

module.exports = GoogleOAuthConnection;
