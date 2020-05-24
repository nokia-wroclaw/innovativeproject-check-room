import { useState } from 'react';

class Auth {
   constructor( fetcher ) {
      this.fetcher = fetcher;

      [ this.user, this.setUser ] = useState( null );

      [ this.id, this.setId ] = useState( null );
      [ this.type, this.setType ] = useState( null );
      [ this.permissions, this.setPermissions ] = useState( [] );
   }

   async login( user ) {
      this.setUser( user );

      const auth = this.$simpleAuth( user );
      const [ promise, abort ] = this.fetcher.get( 'user', { auth } );
      this.taskToAbort = abort;
      const reply = await promise;

      this.setId( reply.user._id );
      this.setType( reply.user.type );
      this.setPermissions( reply.permissions );
      this.taskToAbort = null;
   }

   logout() {
      if ( this.taskToAbort ) {
         this.taskToAbort();
         this.taskToAbort = null;
      }

      this.setId( null );
      this.setType( null );
      this.setPermissions( [] );

      this.setUser( null );
   }

   token() {
      return this.user.tokenId;
   }

   can( action ) {
      return this.permissions && this.permissions.includes( action );
   }

   $simpleAuth( user ) {
      return {
         token: () => user.tokenId
      };
   }
}

export default Auth;
