const express = require( 'express' );

const router = express.Router();

router.get( '/config', function ( req, res, next ) {
   res.send( {
      appName: 'Check Room',
   } );
} );

module.exports = router;
