class NoneAllowed {
   handle( req, res, next ) {
      next();
   }

   handler() {
      return this.handle;
   }
}

module.exports = NoneAllowed;
