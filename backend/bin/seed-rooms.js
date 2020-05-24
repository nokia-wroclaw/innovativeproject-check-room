#!/usr/bin/env node

const moment = require( 'moment' );
const yargs = require( 'yargs' );
const CalendarClient = require( '../app/calendar/CalendarClient' );

async function addEvent( calendar, startDate, endDate, summary ) {
   const event = {
      calendar,
      start: startDate,
      end: endDate,
      summary,
      description: '',
   };

   try {
      const client = new CalendarClient();
      await client.addEvent( event );
   }
   catch ( e ) {
      console.warn( `Failed to add event: ${e}` );
   }
}

async function allRooms() {
   const client = new CalendarClient();
   const calendars = await client.listCalendars();

   return calendars
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

            addEvent( calendar, startDate, endDate, randomSummary() );
         }
      }
   }
}

require( 'dotenv' ).config();

const { argv } = yargs
   .usage( 'Usage: npm run seed-rooms -- --days [days] --room [calendar|"all"]' )
   .demandOption( [ 'days', 'room' ] );

seedEvents( argv.days, argv.room ).catch( ( e ) => {
   console.error( `Error: ${e}` );
   process.exit( 1 );
} );
