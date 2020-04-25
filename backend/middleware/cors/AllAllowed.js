class AllAllowed {
   handle( req, res, next ) {
      res.header( 'Access-Control-Allow-Origin', '*' );
      res.header( 'Access-Control-Allow-Headers', '*' );
      next();
   }

   handler() {
      return this.handle;
   }
}

module.exports = AllAllowed;
