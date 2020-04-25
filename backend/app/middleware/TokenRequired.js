const token = 'Check Room';

class TokenRequired {
   handle( req, res, next ) {
      if ( this.authorize( req ) ) {
         next();
      }
      else {
         res.status( 401 ).send( 'Not authorized' );
      }
   }

   handler() {
      return this.handle.bind( this );
   }

   authorize( req ) {
      if ( TokenRequired.disabled ) return true;

      if ( req.method === 'OPTIONS' ) return true;

      if ( req.header( 'X-APP-TOKEN' ) !== token ) return false;

      return true;
   }
}

TokenRequired.disabled = false;

module.exports = TokenRequired;
