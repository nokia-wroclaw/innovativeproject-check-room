const defaultHeaders = [
   'Origin',
   'X-Requested-With',
   'Content-Type,',
   'Accept',
];
const applicationHeaders = [ 'X-APP-TOKEN' ];
const allowedHeaders = defaultHeaders.concat( applicationHeaders ).join( ', ' );

const allowedDomain = process.env.ENVIRONMENT === 'development' ? '*' : process.env.DOMAIN;

module.exports = ( req, res, next ) => {
   res.header( 'Access-Control-Allow-Origin', allowedDomain );
   res.header( 'Access-Control-Allow-Headers', allowedHeaders );
   next();
};
