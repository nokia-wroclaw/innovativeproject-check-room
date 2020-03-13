const supertest = require( 'supertest' );
const app = require( '../app' );

const request = supertest( app );

it( 'Provides /api/config endpoint', async () => {
   const res = await request.get( '/api/config' );
   expect( res.statusCode ).toBe( 200 );
   expect( res.body.appName ).toBeDefined();
} );

it( 'Does not provide unnecessary endpoints', async () => {
   const res = await request.get( '/' );
   expect( res.statusCode ).toBe( 404 );

   const res2 = await request.get( '/api' );
   expect( res2.statusCode ).toBe( 404 );
} );
