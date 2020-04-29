#!/usr/bin/env node

const fetch = require( 'node-fetch' );
const moment = require( 'moment' );
const yargs = require( 'yargs' );

async function addEvent( calendar, startDate, endDate, summary ) {
   const res = await fetch( `http://127.0.0.1:2000/api/calendar/${calendar}`,
      {
         method: 'POST',
         headers: { 'X-APP-TOKEN': 'Check Room', 'Content-Type': 'application/json' },
         body: JSON.stringify( {
            startDate: startDate.format(),
            endDate: endDate.format(),
            summary,
            description: '',
         } ),
      } );

   if ( !res.ok ) {
      console.warn( `Failed to add event: ${await res.text()}` );
   }
}

async function allRooms() {
   const res = await fetch( 'http://127.0.0.1:2000/api/calendars',
      {
         headers: { 'X-APP-TOKEN': 'Check Room' },
      } );

   const data = await res.json();

   return data
      .filter( ( x ) => x.summary.substr( 0, 5 ) === 'ROOM_' )
      .map( ( x ) => x.id.split( '@' )[0] );
}

function randUniform( min, max ) {
   return Math.floor( Math.random() * ( max - min ) + min );
}

function randomSummary() {
   const summaries = [
      'Daily stand-up',
      'Investor meeting',
      'Event storming session',
      'TBD',
      'Training session',
      'Sprint retro',
   ];

   return summaries[randUniform( 0, summaries.length - 1 )];
}

async function seedEvents( days, room ) {
   const calendars = room === 'all' ? await allRooms() : [ room ];

   for ( let i = 0; i < calendars.length; i += 1 ) {
      const calendar = calendars[i];

      for ( let j = 0; j < days; j += 1 ) {
         const day = moment().startOf( 'day' ).add( j, 'day' );

         for ( let l = 0; l < 3; l += 1 ) {
            const start = randUniform( 7 * 2, 15 * 2 ) * 30;
            const length = randUniform( 1, 4 ) * 60;

            const startDate = moment( day ).add( start, 'minute' );
            const endDate = moment( startDate ).add( length, 'minute' );

            // eslint-disable-next-line no-await-in-loop
            await addEvent( calendar, startDate, endDate, randomSummary() );
         }
      }
   }
}

const { argv } = yargs
   .usage( 'Usage: npm run seed-rooms -- --days [days] --room [calendar|"all"]' )
   .demandOption( [ 'days', 'room' ] );

try {
   seedEvents( argv.days, argv.room );
}
catch ( e ) {
   console.error( `Failure: ${e}` );
}
