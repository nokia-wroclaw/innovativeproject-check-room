const mongoose = require( 'mongoose' );

class DBConnection {
   async make() {
      if ( DBConnection.connected ) {
         return;
      }

      try {
         await mongoose.connect( process.env.MONGO_URL, {
            useNewUrlParser: true,
         } );
         DBConnection.connected = true;
      }
      catch ( e ) {
         console.error( `Failed to connect to database: ${e}` );
         throw e;
      }
   }
}

DBConnection.connected = false;

module.exports = DBConnection;
