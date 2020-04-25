module.exports = () => {
   const token = 'Check Room';

   return ( req, res, next ) => {
      if ( req.method === 'OPTIONS' ) {
         return next();
      }

      if ( req.header( 'X-APP-TOKEN' ) !== token ) {
         return res.status( 401 ).send( 'Not authorized' );
      }

      return next();
   };
};
