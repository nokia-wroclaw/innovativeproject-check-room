module.exports = () => {
   // In production environment, everything lives
   // under a single origin.
   if ( process.env.ENVIRONMENT !== 'development' ) {
      return ( req, res, next ) => next();
   }

   return ( req, res, next ) => {
      res.header( 'Access-Control-Allow-Origin', '*' );
      res.header( 'Access-Control-Allow-Headers', '*' );
      next();
   };
};
