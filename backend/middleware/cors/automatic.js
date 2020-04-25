const NoneAllowed = require( './noneAllowed' );
const AllAllowed = require( './allAllowed' );

class Automatic {
   handler() {
      const Policy = Automatic.policy;

      return new Policy().handler();
   }
}

Automatic.policy = NoneAllowed;

if ( process.env.ENVIRONMENT === 'development' ) {
   Automatic.policy = AllAllowed;
}

module.exports = Automatic;
