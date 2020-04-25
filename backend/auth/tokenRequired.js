module.exports = function ( req, res, next ) {
   if ( req.method === 'OPTIONS' ) {
      return next();
   }

   if ( req.header( 'X-APP-TOKEN' ) !== 'Check Room' ) {
      return res.status( 401 ).send( 'Not authorized' );
   }

   return next();
};
