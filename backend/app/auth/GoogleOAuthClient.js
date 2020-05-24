const Connection = require( './GoogleOAuthConnection' );

class GoogleOAuthClient {
   constructor() {
      if ( GoogleOAuthClient.connection === null ) {
         GoogleOAuthClient.connection = new Connection();
      }

      this.conn = GoogleOAuthClient.connection.getConnection();
   }

   async verify( token ) {
      if ( !token ) {
         throw new Error( 'Missing user token' );
      }

      const ticket = await this.conn.verifyIdToken( {
         idToken: token,
         audience: this.conn.clientId,
      } );
      const payload = ticket.getPayload();
      const userId = payload.sub;

      return {
         id: payload.sub,
         name: payload.name,
         email: payload.email,
      };
   }
}

GoogleOAuthClient.connection = null;

module.exports = GoogleOAuthClient;
