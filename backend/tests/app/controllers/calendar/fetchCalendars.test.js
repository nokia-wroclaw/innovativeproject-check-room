const { request } = require( '../../../setup.js' );

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
