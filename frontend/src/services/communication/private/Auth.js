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
}

export default Auth;
