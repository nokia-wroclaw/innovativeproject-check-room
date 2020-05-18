import { useState } from 'react';

class Auth {
   constructor() {
      [ this.user, this.setUser ] = useState( null );
   }

   login( user ) {
      this.setUser( user );
   }

   logout() {
      this.setUser( null );
   }

   token() {
      return this.user.tokenId;
   }
}

export default Auth;
