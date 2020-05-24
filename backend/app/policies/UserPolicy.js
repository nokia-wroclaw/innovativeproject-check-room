const userCan = [
   'add event',
];

const adminCan = [
   ...userCan,
   'list users',
   'add user',
];

class UserPolicy {
   constructor( user ) {
      this.type = user.type;
   }

   can( action ) {
      if ( this.type === 'admin' && adminCan.includes( action ) ) return true;
      if ( this.type === 'user' && userCan.includes( action ) ) return true;

      return false;
   }

   wantsTo( action ) {
      if ( !this.can( action ) ) {
         throw new Error( 'Not authorized!' );
      }
   }
}

module.exports = UserPolicy;
