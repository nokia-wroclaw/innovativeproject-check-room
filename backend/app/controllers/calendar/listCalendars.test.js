const { request } = require( '../../../tests/setup.js' );

it( 'Provides /api/calendars endpoint', async () => {
   const res = await request.get( '/api/calendars' );
   expect( res.statusCode ).toBe( 200 );
   expect( Array.isArray( res.body ) ).toBe( true );
} );
