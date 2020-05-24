#!/usr/bin/env node

const moment = require( 'moment' );
const yargs = require( 'yargs' );
const CalendarClient = require( '../app/calendar/CalendarClient' );

async function addEvent( event ) {
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

function randomEvent() {
   const events = [
      [ 'Daily stand-up', 'Plan how you will sit for the rest of the day.' ],
      [ 'Investor meeting', 'Hopefully the projector will work this time.' ],
      [ 'Event storming session', 'We\'re meeting an important customer.' ],
      [ 'TBD', 'To Be Determined.' ],
      [ 'Training session', 'Gotta train these fingers.' ],
      [ 'Sprint retro', 'Remember the happy days.' ],
      [ 'Job interview', 'Shouldn\'t take long.' ],
      [ 'Student projects', 'Under our supervision.' ],
      [ 'Seminar on workplace safety', 'BHP.' ],
      [ 'Seminar on unit testing', '' ], // left blank on purpose
      [ 'Seminar on monorepo usage', '-Seminar on repo usage\n+Seminar on monorepo usage' ],
   ];

   return events[randUniform( 0, events.length - 1 )];
}

async function seedEvents( days, room, eventsPerDay ) {
   const calendars = room === 'all' ? await allRooms() : [ room ];

   for ( let i = 0; i < calendars.length; i += 1 ) {
      const calendar = calendars[i];

      for ( let j = 0; j < days; j += 1 ) {
         const dayStart = moment().startOf( 'day' ).add( j, 'day' );

         for ( let l = 0; l < eventsPerDay; l += 1 ) {
            const startMinutes = randUniform( 7 * 2, 15 * 2 ) * 30;
            const lengthMinutes = randUniform( 1, 4 ) * 60;

            const start = moment( dayStart ).add( startMinutes, 'minute' );
            const end = moment( start ).add( lengthMinutes, 'minute' );

            const [ summary, description ] = randomEvent();
            addEvent( {
               calendar, start, end, summary, description,
            } );
         }
      }
   }
}

require( 'dotenv' ).config();

const { argv } = yargs
   .usage( 'Usage: npm run seed-rooms -- --days [num] --room [calendar|"all"] --eventsPerDay [num]' )
   .demandOption( [ 'days', 'room', 'eventsPerDay' ] );

seedEvents( argv.days, argv.room, argv.eventsPerDay ).catch( ( e ) => {
   console.error( `Error: ${e}` );
   process.exit( 1 );
} );
