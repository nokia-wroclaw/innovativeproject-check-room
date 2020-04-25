const { request } = require( '../setup.js' );

it( 'Does not provide unnecessary endpoints', async () => {
   const res = await request.get( '/' );
   expect( res.statusCode ).toBe( 404 );

   const res2 = await request.get( '/api' );
   expect( res2.statusCode ).toBe( 404 );

   const res3 = await request.get( '/api/calendar' );
   expect( res3.statusCode ).toBe( 404 );

   const res4 = await request.get( '/api/calendar/' );
   expect( res4.statusCode ).toBe( 404 );
} );
