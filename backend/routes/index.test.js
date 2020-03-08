const supertest = require( 'supertest' );
const app = require( '../app' );

const request = supertest( app );

it( 'Provides /config endpoint', async () => {
   const res = await request.get( '/config' );
   expect( res.statusCode ).toBe( 200 );
   expect( res.body.appName ).toBeDefined();
} );

it( 'Does not provide / endpoint', async () => {
   const res = await request.get( '/' );
   expect( res.statusCode ).toBe( 404 );
} );
