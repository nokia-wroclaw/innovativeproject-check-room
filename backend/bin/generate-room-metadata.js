#!/usr/bin/env node

const readline = require( 'readline' );

const rl = readline.createInterface( {
   input: process.stdin,
   output: process.stdout,
} );

function prompt( text ) {
   return new Promise( ( resolve, reject ) => {
      rl.setPrompt( text );
      rl.prompt( text );
      rl.on( 'line', ( line ) => {
         resolve( line );
      } );
   } );
}

function optional( text ) {
   return text.length === 0 ? undefined : text;
}

function int( text ) {
   return text ? parseInt( text, 10 ) : undefined;
}

async function build() {
   const room = { lc: {} };

   room.nm = await prompt( 'Room name: ' );
   room.dc = optional( await prompt( 'Description: ' ) );
   room.lc.b = optional( await prompt( 'Building: ' ) );
   room.lc.f = int( optional( await prompt( 'Floor: ' ) ) );
   room.st = int( optional( await prompt( 'Number of seats: ' ) ) );
   room.pj = int( optional( await prompt( 'Has projector [0/1]: ' ) ) );
   room.wb = int( optional( await prompt( 'Has whiteboard [0/1]: ' ) ) );

   if ( !room.lc.b || !room.lc.f ) room.lc = undefined;

   console.log( JSON.stringify( room ) );

   rl.close();
}

build().catch( ( e ) => {
   console.error( `Error: ${e}` );
   process.exit( 1 );
} );
