const NoneAllowed = require( './NoneAllowed' );
const AllAllowed = require( './AllAllowed' );

class Automatic {
   constructor() {
      if ( Automatic.policy === null ) {
         Automatic.policy = NoneAllowed;

         if ( process.env.ENVIRONMENT === 'development' ) {
            Automatic.policy = AllAllowed;
         }
      }
   }

   handler() {
      const Policy = Automatic.policy;

      return new Policy().handler();
   }
}

Automatic.policy = null;

module.exports = Automatic;
