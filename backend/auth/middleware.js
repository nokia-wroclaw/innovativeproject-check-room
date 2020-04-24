module.exports = function ( req, res, next ) {
   if ( req.header( 'X-APP-TOKEN' ) !== 'Check Room' ) {
      res.status( 401 ).send( 'Not authorized' );
   }
   else {
      next();
   }
};
