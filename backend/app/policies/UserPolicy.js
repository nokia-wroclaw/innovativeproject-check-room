const userCan = [
   'add event',
];

const adminCan = [
   ...userCan,
   'list users',
   'edit user',
];

class UserPolicy {
   constructor( user ) {
      this.type = user.type;
   }

   listPermissions() {
      if ( this.type === 'admin' ) return adminCan;
      if ( this.type === 'user' ) return userCan;

      return [];
   }

   can( action ) {
      return this.listPermissions().includes( action );
   }

   wantsTo( action ) {
      if ( !this.can( action ) ) {
         throw new Error( 'Not authorized!' );
      }
   }
}

module.exports = UserPolicy;
