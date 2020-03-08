const supertest = require( 'supertest' );
const app = require( '../app' );

const request = supertest( app );

it( 'Provides /config endpoint', async () => {
   const res = await request.get( '/config' );
   expect( res.statusCode ).toBe( 200 );
} );

it( 'Does not provide / endpoint', async () => {
   const res = await request.get( '/' );
   expect( res.statusCode ).toBe( 404 );
} );
