import { useState } from 'react';

class Auth {
   constructor( backend ) {
      this.backend = backend;
      [ this.user, this.setUser ] = useState( null );
      [ this.type, this.setType ] = useState( null );
      [ this.permissions, this.setPermissions ] = useState( [] );
   }

   async login( user ) {
      this.setUser( user );

      const auth = this.$simpleAuth( user );
      const [ promise, abort ] = this.backend.fetcher.get( 'user', { auth } );
      this.taskToAbort = abort;
      const reply = await promise;

      this.setType( reply.user.type || 'guest' );
      this.setPermissions( reply.permissions );
      this.taskToAbort = null;
   }

   logout() {
      this.setUser( null );

      if ( this.taskToAbort ) {
         this.taskToAbort();
         this.taskToAbort = null;
      }

      this.setType( null );
      this.setPermissions( [] );
   }

   token() {
      return this.user.tokenId;
   }

   $simpleAuth( user ) {
      return {
         token: () => user.tokenId
      };
   }
}

export default Auth;
