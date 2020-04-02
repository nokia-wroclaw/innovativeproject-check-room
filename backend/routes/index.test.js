const { request } = require( '../tests/testing.js' );

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

   const res3 = await request.get( '/api/calendar' );
   expect( res3.statusCode ).toBe( 404 );

   const res4 = await request.get( '/api/calendar/' );
   expect( res4.statusCode ).toBe( 404 );
} );

it( 'Provides /api/calendars endpoint', async () => {
   const res = await request.get( '/api/calendars' );
   expect( res.statusCode ).toBe( 200 );
   expect( Array.isArray( res.body ) ).toBe( true );
} );

it( 'Returns calendar via /api/calendar/*', async () => {
   const res = await request.get( '/api/calendar/test?startDate=2020-01-01' );
   expect( res.statusCode ).toBe( 200 );

   const res2 = await request.get( '/api/calendar/test' );
   expect( res2.statusCode ).toBe( 400 );

   expect( res.body.calendar ).toBeDefined();
   expect( typeof res.body.calendar.id ).toBe( 'string' );

   expect( Array.isArray( res.body.events ) ).toBe( true );
   expect( res.body.events.length > 0 ).toBe( true );
   expect( res.body.events[0].id === 'event' ).toBe( true );
} );

it( 'Returns error via /api/calendar/* when calendar does not exist', async () => {
   const res1 = await request.get( '/api/calendar/test2' );
   expect( res1.statusCode ).toBe( 400 );

   const res2 = await request.get( '/api/calendar/test2?startDate=2020-01-01' );
   expect( res2.statusCode ).toBe( 400 );

   const res3 = await request.get( '/api/calendar/tes' );
   expect( res3.statusCode ).toBe( 400 );

   const res4 = await request.get( '/api/calendar/tes?startDate=2020-01-01' );
   expect( res4.statusCode ).toBe( 400 );
} );
