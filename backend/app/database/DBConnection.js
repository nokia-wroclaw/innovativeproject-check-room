const mongoose = require( 'mongoose' );

class DBConnection {
   async getConnection() {
      if ( DBConnection.connection == null ) {
         await this.$connect();
      }

      return DBConnection.connection;
   }

   async $connect() {
      try {
         DBConnection.connection = await mongoose.connect( process.env.MONGO_URL, {
            useNewUrlParser: true,
         } );
      }
      catch ( e ) {
         console.log( `Failed to connect to database: ${e}` );
         throw e;
      }
   }
}

DBConnection.connection = null;

module.exports = DBConnection;
