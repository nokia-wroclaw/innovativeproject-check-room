module.exports = () => {
   const defaultHeaders = [
      'Origin',
      'X-Requested-With',
      'Content-Type,',
      'Accept',
   ];
   const applicationHeaders = [ 'X-APP-TOKEN' ];
   const allowedHeaders = defaultHeaders.concat( applicationHeaders ).join( ', ' );

   console.log( process.env.ENVIRONMENT );
   console.log( process.env.ENVIRONMENT === 'development' );
   console.log( process.env.DOMAIN );
   const allowedDomain = process.env.ENVIRONMENT === 'development' ? '*' : process.env.DOMAIN;

   return ( req, res, next ) => {
      res.header( 'Access-Control-Allow-Origin', allowedDomain );
      res.header( 'Access-Control-Allow-Headers', allowedHeaders );
      next();
   };
};
