const { Mutex } = require( 'async-mutex' );

class MutexPool {
   constructor() {
      this.pool = new Map();
   }

   for( id ) {
      if ( this.pool.has( id ) ) {
         return this.pool.get( id );
      }

      const mutex = new Mutex();
      this.pool.set( id, mutex );

      return mutex;
   }

   async acquire( id ) {
      return this.for( id ).acquire();
   }
}

module.exports = MutexPool;
